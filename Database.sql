CREATE TABLE Users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO Users (username, email, password)
VALUES 
    ('Аяулым', 'ayaulym@example.com', 'password123'),
    ('Назерке', 'nazerke@example.com', 'password456'),
    ('Мадина', 'madina@example.com', 'password789'),
    ('Жанерке', 'zhanerke@example.com', 'password321'),
    ('Дана', 'dana@example.com', 'password654'),
    ('Әсем', 'asem@example.com', 'password987'),
    ('Гүлмира', 'gulmira@example.com', 'password111'),
    ('Айнұр', 'ainur@example.com', 'password222'),
    ('Аружан', 'aruzhan@example.com', 'password333'),
    ('Айым', 'aiym@example.com', 'password444'),
    ('Балнұр', 'balnur@example.com', 'password555'),
    ('Шолпан', 'sholpan@example.com', 'password666'),
    ('Гүлнұр', 'gulnur@example.com', 'password777'),
    ('Жансая', 'zhansaya@example.com', 'password888'),
    ('Сымбат', 'symbat@example.com', 'password999');
CREATE TABLE Products (
    product_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    stock INT DEFAULT 0,
    category VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO Products (name, description, price, stock, category)
VALUES 
    ('Классикалық көйлек', 'Классикалық стильдегі кеңсеге арналған көйлек', 15000.00, 20, 'Көйлектер'),
    ('Жаздық сарафан', 'Жеңіл жазға арналған сарафан', 10000.00, 15, 'Көйлектер'),
    ('Қысқа күртеше', 'Сәнді қысқа күртеше', 25000.00, 12, 'Сырт киім'),
    ('Жылулық пальто', 'Қысқа арналған стильді пальто', 50000.00, 10, 'Сырт киім'),
    ('Жейде', 'Әмбебап жейде әртүрлі жағдайлар үшін', 7000.00, 30, 'Жейделер'),
    ('Кеңсе юбкасы', 'Кеңсе жұмысына арналған қара юбка', 12000.00, 25, 'Юбкалар'),
    ('Спорттық костюм', 'Спорттық жаттығуға арналған киім', 20000.00, 12, 'Спорттық киім'),
    ('Қысқы куртка', 'Қысқа арналған жылы куртка', 55000.00, 8, 'Сырт киім'),
    ('Капюшонды свитер', 'Әмбебап свитер капюшоны бар', 15000.00, 20, 'Свитерлер'),
    ('Трикотаж топ', 'Жеңіл және ыңғайлы трикотаж топ', 8000.00, 25, 'Топтар'),
    ('Жұқа пальто', 'Күзгі стильдегі жеңіл пальто', 40000.00, 10, 'Сырт киім'),
    ('Классикалық пиджак', 'Іскерлік кездесу үшін пиджак', 30000.00, 15, 'Пиджактар'),
    ('Күзгі плащ', 'Күз мезгіліне арналған стильді плащ', 45000.00, 10, 'Сырт киім'),
    ('Трикотаж көйлек', 'Күнделікті киюге арналған трикотаж көйлек', 12000.00, 18, 'Көйлектер'),
    ('Кеңсе шалбары', 'Кеңсе стиліндегі қара шалбар', 13000.00, 20, 'Шалбарлар'),
    ('Жаздық футболка', 'Жазғы күндерге арналған жеңіл футболка', 5000.00, 50, 'Футболкалар'),
    ('Жаңа жылдық свитер', 'Мерекелік стильдегі жылы свитер', 18000.00, 10, 'Свитерлер'),
    ('Джинсы шалбары', 'Жұмсақ әрі ыңғайлы джинсы шалбар', 20000.00, 30, 'Шалбарлар'),
    ('Қара кешкі көйлек', 'Кешкі кездесулерге арналған қара көйлек', 45000.00, 8, 'Көйлектер'),
    ('Түнгі жейде', 'Жұмсақ әрі жеңіл түнгі жейде', 9000.00, 20, 'Іш киім');
CREATE TABLE Orders (
    order_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) DEFAULT 'Өңделуде',
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);
INSERT INTO Orders (user_id, order_date, status)
VALUES 
    (1, '2024-10-25 10:30:00', 'Жеткізілуде'),
    (2, '2024-10-26 14:45:00', 'Өңделуде'),
    (3, '2024-10-27 09:15:00', 'Қабылданды'),
    (4, '2024-10-27 18:00:00', 'Жеткізілді'),
    (5, '2024-10-28 12:00:00', 'Өңделуде'),
    (6, '2024-10-29 15:20:00', 'Қабылданды'),
    (7, '2024-10-30 17:40:00', 'Жеткізілуде'),
    (8, '2024-11-01 11:25:00', 'Өңделуде'),
    (9, '2024-11-02 13:35:00', 'Қабылданды'),
    (10, '2024-11-03 16:45:00', 'Жеткізілді'),
    (11, '2024-11-03 19:55:00', 'Жеткізілуде'),
    (12, '2024-11-04 08:05:00', 'Өңделуде'),
    (13, '2024-11-04 09:15:00', 'Қабылданды'),
    (14, '2024-11-04 14:30:00', 'Жеткізілді'),
    (15, '2024-11-04 15:45:00', 'Өңделуде');
CREATE TABLE Order_Items (
    item_id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES Orders(order_id),
    FOREIGN KEY (product_id) REFERENCES Products(product_id)
);
INSERT INTO Order_Items (order_id, product_id, quantity, price)
VALUES 
    (1, 1, 2, 15000.00),  -- Аяулым классикалық көйлектен екі дана алды
    (2, 4, 1, 7000.00),   -- Назерке бір жейде сатып алды
    (3, 5, 1, 12000.00);  -- Мадина кеңсе юбкасын сатып алды
INSERT INTO Payments (order_id, amount, payment_method)
VALUES 
    (1, 30000.00, 'Карта'),   -- Аяулымның төлемі
    (2, 7000.00, 'Карта'),    -- Назеркенің төлемі
    (3, 12000.00, 'Қолма-қол'); -- Мадинаның төлемі
CREATE TABLE Payments (
    payment_id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    payment_method VARCHAR(50) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES Orders(order_id)
);