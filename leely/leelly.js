

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
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    if (!email || !password) {
        alert("Введите email и пароль!");
        return;
    }
    // Отправка данных на сервер
    fetch("login.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("Вход выполнен успешно!");

            // Закрытие модального окна
            const authModal = document.getElementById("auth-modal");
            if (authModal) {
                authModal.style.display = "none"; // Скрываем модальное окно
            }
            
            localStorage.setItem("userEmail", email);
            localStorage.setItem("loggedIn", "true");

    // Показываем кнопку "Шығу" и скрываем "Кіру"
            document.querySelector(".login-btn").style.display = "none";
            document.querySelector(".logout-btn").style.display = "inline-block";

    // Очистка полей
            document.getElementById("login-email").value = "";
            document.getElementById("login-password").value = "";

    // Перенаправление на страницу
           

            // Перенаправление пользователя на другую страницу (если нужно)
            
        } else {
            alert(data.message || "Ошибка входа.");
        }
    })
    .catch(error => console.error("Ошибка:", error));
}

function logout() {
    // Удаляем данные пользователя из localStorage
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');

    // Отправляем запрос на сервер для завершения сессии
    fetch("logout.php", {
        method: "POST",
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("Вы успешно вышли из аккаунта!");

            // Скрываем кнопку "Выход" и показываем кнопку "Вход"
            document.querySelector(".logout-btn").style.display = "none";
            document.querySelector(".login-btn").style.display = "inline-block";

            // Перенаправляем пользователя на главную страницу
            window.location.href = "leelly.html#slider";
        } else {
            alert("Ошибка при выходе из аккаунта.");
        }
    })
    .catch(error => console.error("Ошибка:", error));
}


window.onload = function () {
    const loggedIn = localStorage.getItem("loggedIn") === "true";

    if (loggedIn) {
        // Если пользователь вошёл, показываем кнопку "Шығу"
        document.querySelector(".login-btn").style.display = "none";
        document.querySelector(".logout-btn").style.display = "inline-block";
    } else {
        // Если пользователь не вошёл, показываем кнопку "Кіру"
        document.querySelector(".login-btn").style.display = "inline-block";
        document.querySelector(".logout-btn").style.display = "none";
    }
};



// Тіркелу функциясы
function register() {
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;

    // Проверка заполненности полей
    if (!name || !email || !password) {
        alert("Пожалуйста, заполните все поля!");
        return;
    }

    // Отправка данных на сервер
    fetch("register.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: name,
            email: email,
            password: password
        })
    })
    .then(response => response.json()) // Парсим ответ от сервера
    .then(data => {
        if (data.success) {
            alert(`${name}, вы успешно зарегистрировались!`);
            closeAuthModal(); // Закрываем модальное окно
        } else {
            alert(data.message || "Ошибка регистрации!");
        }
    })
    .catch(error => {
        console.error("Ошибка:", error);
        alert("Произошла ошибка при подключении к серверу.");
    });
}






// Инициализация корзины из localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Функция добавления товара в корзину
function addToCart(name, price) {
    const isLoggedIn = localStorage.getItem('loggedIn') === 'true'; // Проверяем авторизацию
    if (!isLoggedIn) {
        alert('Тауарды себетке қосу үшін алдымен жүйеге кіріңіз!');
        return;
    }

    // Добавляем товар в массив
    cart.push({ name, price });
    console.log("Товар добавлен в корзину:", { name, price }); // Лог для отладки

    // Сохраняем корзину в localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Уведомление об успешном добавлении
    alert(`${name} себетке қосылды!`);

    // Обновляем содержимое корзины
    updateCartModal();
}

// Функция обновления содержимого модального окна корзины
function updateCartModal() {
    const cartItemsContainer = document.getElementById('cart-items');
    if (!cartItemsContainer) {
        console.error('Элемент с ID "cart-items" не найден!');
        return;
    }

    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<li>Себет бос!</li>';
        return;
    }

    const userEmail = localStorage.getItem('userEmail') || 'Қолданушы'; // Получаем email пользователя
    let total = 0;

    const userRow = document.createElement('li');
    userRow.style.fontWeight = 'bold';
    userRow.textContent = `Қолданушы: ${userEmail}`;
    cartItemsContainer.appendChild(userRow);

    cart.forEach((item, index) => {
        total += item.price;

        const itemRow = document.createElement('li');
        itemRow.innerHTML = `
            ${item.name} - ${item.price} тг
            <button class="remove-btn" onclick="removeFromCart(${index})">Өшіру</button>
        `;
        cartItemsContainer.appendChild(itemRow);
    });

    const totalElement = document.createElement('li');
    totalElement.style.fontWeight = 'bold';
    totalElement.textContent = `Жалпы сумма: ${total} тг`;
    cartItemsContainer.appendChild(totalElement);

    console.log("Обновление корзины завершено. Текущая корзина:", cart);
}

// Функция удаления товара из корзины
function removeFromCart(index) {
    if (index < 0 || index >= cart.length) {
        console.error('Индекс вне диапазона:', index);
        return;
    }

    cart.splice(index, 1); // Удаляем товар из массива
    localStorage.setItem('cart', JSON.stringify(cart)); // Обновляем данные в localStorage
    console.log("Товар удалён. Текущая корзина:", cart);

    updateCartModal(); // Обновляем содержимое корзины
}

// Функция отображения модального окна корзины
function showCartModal() {
    const cartModal = document.getElementById('cart-modal');
    if (cartModal) {
        cartModal.style.display = 'block'; // Показываем модальное окно
        updateCartModal(); // Обновляем содержимое корзины
    } else {
        console.error('Элемент с ID "cart-modal" не найден!');
    }
}

function checkout() {
    const isLoggedIn = localStorage.getItem('loggedIn') === 'true'; // Проверяем авторизацию
    if (!isLoggedIn) {
        alert('Оплатуды жасау үшін алдымен жүйеге кіріңіз!');
        return;
    }

    if (cart.length === 0) {
        alert('Себет бос!');
        return;
    }

    const userEmail = localStorage.getItem('userEmail');
    const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);

    // Формируем данные для отправки
    const orderData = {
        email: userEmail,
        items: cart,
        total: totalAmount,
        date: new Date().toISOString()
    };

    // Отправляем данные на сервер
    fetch("saveOrder.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(orderData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Оплата сәтті аяқталды! Тапсырысыңыз сақталды.');
            cart = []; // Очищаем корзину
            localStorage.removeItem('cart'); // Удаляем корзину из localStorage
            updateCartModal(); // Обновляем отображение корзины
        } else {
            alert('Тапсырысты сақтау кезінде қате болды.');
        }
    })
    .catch(error => {
        console.error('Қате:', error);
        alert('Сервермен қосылу кезінде қате болды.');
    });
}

// Функция закрытия модального окна корзины
function closeCart() {
    const cartModal = document.getElementById('cart-modal');
    if (cartModal) {
        cartModal.style.display = 'none'; // Скрываем модальное окно
    } else {
        console.error('Элемент с ID "cart-modal" не найден!');
    }
}

// Обновляем содержимое корзины при загрузке страницы
window.onload = () => {
    cart = JSON.parse(localStorage.getItem('cart')) || [];
    console.log("Корзина загружена при загрузке страницы:", cart);
    updateCartModal();
};


// Жүйеден шығу функциясы



// Пікірлерді сақтау үшін массив


function sendReview() {
    const reviewText = document.getElementById("review-text").value.trim(); // Получение и обрезка пробелов

    // Получение email авторизованного пользователя
    const userEmail = localStorage.getItem("userEmail");
    if (!userEmail) {
        alert("Вы должны войти в аккаунт, чтобы оставить отзыв!");
        return;
    }

    // Проверка, что отзыв не пустой
    if (!reviewText) {
        alert("Пожалуйста, введите текст отзыва!");
        return;
    }

    // Отправка данных на сервер
    fetch("submit-review.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ review: reviewText, email: userEmail }) // Отправка отзыва и email
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Ошибка HTTP: ${response.status}`);
        }
        return response.json(); // Предполагаем, что сервер возвращает JSON
    })
    .then(data => {
        if (data.success) {
            // Очистить поле ввода и показать сообщение об успешной отправке
            document.getElementById("review-text").value = "";
            const messageBox = document.getElementById("review-message");
            messageBox.style.display = "block";

            // Скрыть сообщение об успешной отправке через 3 секунды
            setTimeout(() => {
                messageBox.style.display = "none";
            }, 3000);

            // Перезагрузить список комментариев
            if (typeof loadComments === "function") {
                loadComments();
            }
        } else {
            alert(data.message || "Ошибка при отправке отзыва.");
        }
    })
    .catch(error => {
        console.error("Ошибка при отправке отзыва:", error);
        alert("Произошла ошибка при отправке отзыва. Пожалуйста, попробуйте снова.");
    });
}




// Пікірлерді көрсету функциясы
// Функция загрузки комментариев
function loadComments() {
    fetch("get-reviews.php") // Укажите правильный путь к вашему серверному обработчику
        .then(response => {
            if (!response.ok) {
                throw new Error(`Ошибка HTTP: ${response.status}`);
            }
            return response.json();
        })
        .then(comments => {
            const commentsContainer = document.getElementById("comments");
            commentsContainer.innerHTML = ""; // Очищаем только комментарии

            if (comments.length === 0) {
                commentsContainer.innerHTML = "<p>Әзірге пікірлер жоқ.</p>";
                return;
            }

            comments.forEach(comment => {
                const commentCard = document.createElement("div");
                commentCard.classList.add("comment-card");

                commentCard.innerHTML = `
                    <p class="author"><strong>${comment.name}</strong> <span>${new Date(comment.created_at).toLocaleString()}</span></p>
                    <p>${comment.review}</p>
                `;

                commentsContainer.appendChild(commentCard);
            });
        })
        .catch(error => {
            console.error("Ошибка при загрузке комментариев:", error);
        });
}


// Загружаем комментарии при загрузке страницы
document.addEventListener("DOMContentLoaded", loadComments);

document.addEventListener("DOMContentLoaded", () => {
    const commentsList = document.getElementById("comments-list");
    if (!commentsList) {
        console.error("Список комментариев не найден!");
        console.log("HTML содержимое документа:", document.documentElement.innerHTML); // Отобразить весь HTML
    } else {
        console.log("Список комментариев загружен!", commentsList);
    }
});





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
setInterval(changeSlide, 3000); // 3 секунд сайын слайдты ауыстыру

// Слайдер басталғанда алғашқы слайдты көрсету
changeSlide();
