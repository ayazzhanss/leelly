// Пайдаланушының авторизацияланғаны туралы ақпаратты localStorage-тан алу
let loggedIn = localStorage.getItem('loggedIn') === 'true';

// Модалды ашу функциясы
function openAuthModal() {
    document.getElementById('auth-modal').style.display = 'flex';
}

// Модалды жасыру функциясы
function closeAuthModal() {
    document.getElementById('auth-modal').style.display = 'none';
}

// Формаларды ауыстыру функциясы
function toggleAuthForms() {
    let loginForm = document.getElementById('login-form');
    let registerForm = document.getElementById('register-form');
    
    if (loginForm.style.display === 'none') {
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
    } else {
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
    }
}

// Кіру функциясы
function login() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    // Тексеру: Егер email мен құпиясөз дұрыс болса
    if (email === "user@gmail.com" && password === "qazxsw123") {
        loggedIn = true;
        localStorage.setItem('loggedIn', 'true');  // localStorage-ке кірген пайдаланушының күйін сақтау
        alert("Сіз жүйеге кірдіңіз!");
        closeAuthModal(); // Модалды жасыру
    } else {
        alert("Қате email немесе құпиясөз");
    }    
}

// Тіркелу функциясы
function register() {
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    
    // Қарапайым тіркелу тексерісі
    if (name && email && password) {
        loggedIn = true;
        localStorage.setItem('loggedIn', 'true');  // localStorage-ке тіркелген пайдаланушының күйін сақтау
        alert(`${name}, сәтті тіркелдіңіз!`);
        closeAuthModal(); // Модалды жасыру
    } else {
        alert("Барлық деректерді толтырыңыз!");
    }
}



// Себет массиві
let cart = [];

// Себетке өнім қосу функциясы
function addToCart(item, price) {
    cart.push({ item, price });
    alert(`${item} себетке қосылды!`);
    updateCart(); // Себетті жаңарту
}


// Себеттегі өнімдерді көрсету функциясы
function updateCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = ''; // Себетті тазарту

    // Әрбір өнімді себетке қосу
    cart.forEach(product => {
        const li = document.createElement('li');
        li.textContent = `${product.item} - ${product.price} тг`;
        cartItems.appendChild(li);
    });
}

// Себетті ашу функциясы
function openCart() {
    const cartModal = document.getElementById('cart-modal');
    cartModal.style.display = 'block'; // Себет модалын ашу
    updateCart(); // Себетті жаңарту
}

// Себетті жабу функциясы
function closeCart() {
    const cartModal = document.getElementById('cart-modal');
    cartModal.style.display = 'none'; // Себет модалын жабу
}

// Төлем жасау функциясы
function checkout() {
    if (cart.length === 0) {
        alert("Себетіңіз бос! Өнімдерді себетке қосыңыз.");
    } else {
        let total = cart.reduce((sum, product) => sum + product.price, 0);
        alert(`Барлығы: ${total} тг. Төлем жасау үшін төлем формасын енгізіңіз.`);
        openPaymentModal(total);
    }
}

// Төлем модалын ашу
function openPaymentModal(totalAmount) {
    const paymentModal = document.createElement('div');
    paymentModal.innerHTML = `
        <div class="modal-content">
            <h3>Төлем жасау</h3>
            <form id="payment-form">
                <label for="card-element">Картаны енгізіңіз:</label>
                <div id="card-element"></div>
                <button type="submit">Төлеу</button>
            </form>
            <button onclick="closePaymentModal()">Жабу</button>
        </div>
    `;
    paymentModal.classList.add('modal');
    document.body.appendChild(paymentModal);

    // Stripe элементтерін құру
    const stripe = Stripe('YOUR_STRIPE_PUBLIC_KEY'); // Сіздің Stripe ашық кілтіңіз
    const elements = stripe.elements();
    const card = elements.create('card');
    card.mount('#card-element');

    // Төлемді өңдеу
    document.getElementById('payment-form').addEventListener('submit', async (event) => {
        event.preventDefault();

        const { token, error } = await stripe.createToken(card);
        if (error) {
            alert(`Қате: ${error.message}`);
        } else {
            processPayment(token, totalAmount);
        }
    });
}

// Төлемді серверге жіберу
function processPayment(token, totalAmount) {
    fetch('/process-payment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            token: token.id,
            amount: totalAmount * 100, // Stripe тек тиынмен жұмыс істейді
        }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("Төлем сәтті өтті!");
            cart = []; // Себетті тазарту
            updateCart();
            closePaymentModal();
        } else {
            alert("Төлем сәтсіз аяқталды.");
        }
    });
}

// Төлем модалын жабу
function closePaymentModal() {
    const paymentModal = document.querySelector('.modal');
    paymentModal.remove();
}


// Өнімдер массиві
const dresses = [
    { name: 'Лауретта', image: 'dress1.jpg', price: 45900 },
    { name: 'Шантэль', image: 'dress2.jpg', price: 31500 },
    { name: 'Салони', image: 'dress3.png', price: 42500 },
    // Қалған көйлектер
];

const pants = [
    { name: 'Джинсы', image: 'pants1.png', price: 45900 },
    { name: 'Шантэль', image: 'dress2.jpg', price: 31500 },
    { name: 'Салони', image: 'dress3.png', price: 42500 },
    // Қалған көйлектер
];

// Өнімдерді көрсету функциясы
function displayProducts(category) {
    const productsContainer = document.getElementById('products');
    productsContainer.innerHTML = ''; // Бұрынғы өнімдерді тазарту

    category.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.price} тг</p>
            <button onclick="addToCart('${product.name}', ${product.price})">Себетке қосу</button>
        `;
        productsContainer.appendChild(productCard);
    });
}

// Бұл функцияны қажетті жерде шақыру
displayProducts(dresses);

// Жүйеден шығу функциясы
function logout() {
    loggedIn = false;
    localStorage.setItem('loggedIn', 'false');  // Жүйеден шыққан пайдаланушының күйін сақтау
    alert("Сіз жүйеден шықтыңыз!");
    openAuthModal();
}


// Пікірлерді сақтау үшін массив
let comments = [];

function submitComment(event) {
    event.preventDefault(); // Форма жіберудің алдын алу

    // Пікір мәтінін алу
    const commentText = document.getElementById('comment-text').value;

    if (commentText.trim() === "") {
        alert("Пікірді енгізіңіз!");
        return;
    }

    comments.push(commentText); // Пікірді сақтау

    // Пікірлерді қайта көрсету
    displayComments();

    // Пікір өрісін тазарту
    document.getElementById('comment-text').value = "";
}


// Пікірлерді көрсету функциясы
function displayComments() {
    const commentsList = document.getElementById('comments');
    
    // Комментарийлер тізімін тазарту
    commentsList.innerHTML = "";

    // Әрбір пікірді қосу
    comments.forEach(comment => {
        const commentCard = document.createElement('div');
        commentCard.classList.add('comment-card');

        const commentText = document.createElement('p');
        commentText.textContent = comment;

        const commentAuthor = document.createElement('p');
        commentAuthor.classList.add('author');
        commentAuthor.textContent = "Қолданушы"; // Автордың аты

        commentCard.appendChild(commentText);
        commentCard.appendChild(commentAuthor);
        
        commentsList.appendChild(commentCard);
    });
}

// Слайдер элементтерін алу
let currentSlideIndex = 0;
const slides = document.querySelectorAll('#slider .slide');
const totalSlides = slides.length;

// Слайдер суреттерін ауыстыру функциясы
function changeSlide() {
    // Барлық слайдтарды жасыру
    slides.forEach((slide, index) => {
        slide.style.display = 'none';
    });

    // Келесі слайдты көрсету
    currentSlideIndex++;
    if (currentSlideIndex >= totalSlides) {
        currentSlideIndex = 0;  // Егер соңғы слайдқа жетсе, қайта бірінші слайдқа оралу
    }

    slides[currentSlideIndex].style.display = 'block';
}

// Слайдерді автоматты түрде айналдыру
setInterval(changeSlide, 5000); // 3 секунд сайын слайдты ауыстыру

// Слайдер басталғанда алғашқы слайдты көрсету
changeSlide();
