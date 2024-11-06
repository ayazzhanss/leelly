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
    ('Сымбат', 'symbat@example.com', 'password999');