from flask import Flask, request, jsonify
from flask_cors import CORS
from db_config import get_db_connection
from datetime import datetime, timedelta

app = Flask(__name__)
CORS(app)
# ---------------- REGISTER USER ---------------- #
@app.route('/register', methods=['POST'])
def register():
    data = request.json

    conn = get_db_connection()
    cursor = conn.cursor()

    query = """INSERT INTO Users (Users_Name, Email, Phone, Address, Password)
               VALUES (%s, %s, %s, %s, %s)"""

    cursor.execute(query, (
        data['name'],
        data['email'],
        data['phone'],
        data['address'],
        data['password']
    ))

    conn.commit()

    return jsonify({"message": "User Registered Successfully"})

# ---------------- LOGIN ---------------- #
@app.route('/login', methods=['POST'])
def login():
    data = request.json

    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute(
        "SELECT Users_Id FROM Users WHERE Email=%s AND Password=%s",
        (data['email'], data['password'])
    )

    user = cursor.fetchone()

    if user:
        return jsonify({"message": "Login Successful", "user_id": user[0]})
    else:
        return jsonify({"message": "Invalid Credentials"})


# ---------------- PRODUCTS ---------------- #
@app.route('/products', methods=['GET'])
def get_products():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("SELECT * FROM Products")
    return jsonify(cursor.fetchall())


# ---------------- ADD TO CART ---------------- #
@app.route('/add_to_cart', methods=['POST'])
def add_to_cart():
    data = request.json

    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO Carts (Users_Id, Products_Id, Quantity)
        VALUES (%s, %s, %s)
        ON DUPLICATE KEY UPDATE Quantity = Quantity + %s
    """, (
        data['user_id'],
        data['product_id'],
        data['quantity'],
        data['quantity']
    ))

    conn.commit()

    return jsonify({"message": "Added to Cart"})


# ---------------- VIEW CART ---------------- #
@app.route('/cart/<int:user_id>', methods=['GET'])
def view_cart(user_id):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
        SELECT p.Products_Name, p.Price, c.Quantity
        FROM Carts c
        JOIN Products p ON c.Products_Id = p.Products_Id
        WHERE c.Users_Id = %s
    """, (user_id,))

    return jsonify(cursor.fetchall())


# ---------------- PLACE ORDER ---------------- #
@app.route('/place_order', methods=['POST'])
def place_order():
    data = request.json
    user_id = data['user_id']

    conn = get_db_connection()
    cursor = conn.cursor()

    # Total
    cursor.execute("""
        SELECT SUM(p.Price * c.Quantity)
        FROM Carts c
        JOIN Products p ON c.Products_Id = p.Products_Id
        WHERE c.Users_Id = %s
    """, (user_id,))
    
    total = cursor.fetchone()[0]

    # Insert order
    cursor.execute("""
        INSERT INTO Orders (Orders_Date, Total_Amount, Users_Id)
        VALUES (%s, %s, %s)
    """, (datetime.now(), total, user_id))

    order_id = cursor.lastrowid   # 🔥 AUTO GENERATED

    # Insert items
    cursor.execute("""
        INSERT INTO Order_Items (Orders_Id, Products_Id, Quantity, Price)
        SELECT %s, Products_Id, Quantity, %s
        FROM Carts WHERE Users_Id = %s
    """, (order_id, total, user_id))

    # Clear cart
    cursor.execute("DELETE FROM Carts WHERE Users_Id = %s", (user_id,))

    conn.commit()

    return jsonify({"message": "Order Placed", "order_id": order_id})


# ---------------- TRACK ---------------- #
@app.route('/track/<int:order_id>', methods=['GET'])
def track(order_id):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
        SELECT Orders_Date FROM Orders WHERE Orders_Id = %s
    """, (order_id,))

    order = cursor.fetchone()

    if not order:
        return jsonify({"message": "Order not found"})

    order_date = order['Orders_Date']
    delivery_date = order_date + timedelta(days=4)

    return jsonify({
        "order_id": order_id,
        "status": "On the way",
        "order_date": str(order_date),
        "delivery_date": str(delivery_date)
    })
# ---------------- RUN ---------------- #
app.run(debug=True)