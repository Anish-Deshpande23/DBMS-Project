function login() {
    loginUser({
        email: "test@gmail.com",
        password: "1234"
    }).then(data => {
        alert(data.message);
    });
}

function addItem() {
    addToCart({
        user_id: 1,
        product_id: 1,
        quantity: 1
    }).then(data => {
        alert(data.message);
    });
}