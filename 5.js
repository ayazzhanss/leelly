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

function setLanguage(lang) {
    const elements = document.querySelectorAll("[data-key]");

    elements.forEach((element) => {
        const key = element.getAttribute("data-key");
        if (translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });

    // Тілді жергілікті сақтау
    localStorage.setItem("selectedLanguage", lang);
}

// Сайт ашылғанда сақталған тілді жүктеу
window.addEventListener("DOMContentLoaded", () => {
    const savedLanguage = localStorage.getItem("selectedLanguage") || "kk";
    setLanguage(savedLanguage);
});


const translations = {
    kk: {
        loginHeader: "Аккаунтқа Кіру",
        login: "Кіру",
        catalog: "Дүкен",
        cart: "Себет",
        checkout: "Төлем",
        username: "Пайдаланушы аты",
        password: "Құпия сөз",
        loginButton: "Кіру",
    },
    ru: {
        loginHeader: "Вход в аккаунт",
        login: "Войти",
        catalog: "Магазин",
        cart: "Корзина",
        checkout: "Оплата",
        username: "Имя пользователя",
        password: "Пароль",
        loginButton: "Войти",
    },
    en: {
        loginHeader: "Account Login",
        login: "Login",
        catalog: "Store",
        cart: "Cart",
        checkout: "Checkout",
        username: "Username",
        password: "Password",
        loginButton: "Login",
    },
};
