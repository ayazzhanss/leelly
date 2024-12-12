<?php
header("Content-Type: application/json");

$host = 'localhost';
$dbname = 'lelly.sql';
$username = 'root';
$password = '';

// Подключение к базе данных
try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo json_encode(["success" => false, "message" => "Ошибка подключения к базе данных: " . $e->getMessage()]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);

// Проверка наличия данных
if (!isset($data['email']) || !isset($data['password'])) {
    echo json_encode(["success" => false, "message" => "Пожалуйста, заполните все поля."]);
    exit;
}

$email = htmlspecialchars($data['email']);
$password = $data['password'];

// Проверка пользователя в базе данных
$stmt = $pdo->prepare("SELECT * FROM users WHERE email = :email");
$stmt->bindParam(':email', $email);
$stmt->execute();
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if ($user && password_verify($password, $user['password'])) {
    // Если пользователь найден и пароль совпадает
    echo json_encode(["success" => true, "message" => "Авторизация успешна"]);
} else {
    // Если пользователь не найден или пароль не совпадает
    echo json_encode(["success" => false, "message" => "Неверный email или пароль"]);
}


?>
