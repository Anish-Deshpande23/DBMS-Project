const BASE_URL = "http://127.0.0.1:5000";

function loginUser(data) {
    return fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
    }).then(res => res.json());
}

function addToCart(data) {
    return fetch(`${BASE_URL}/add_to_cart`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
    }).then(res => res.json());
}

function getProducts() {
    return fetch(`${BASE_URL}/products`)
        .then(res => res.json());
}

function getCart(user_id) {
    return fetch(`${BASE_URL}/cart/${user_id}`)
        .then(res => res.json());
}