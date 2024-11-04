let cart = [];

function showPage(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
}

function addToCart(productName, productPrice) {
    cart.push({ name: productName, price: productPrice });
    updateCart();
}

function updateCart() {
    const cartList = document.getElementById('cart-list');
    cartList.innerHTML = '';
    let totalPrice = 0;
    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = $;{item.name} - $;{item.price} тг;
        cartList.appendChild(li);
        totalPrice += item.price;
    });
    document.getElementById('total-price').textContent = Жалпы; $;{totalPrice} тг;
}