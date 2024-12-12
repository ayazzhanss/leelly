<?php
// Настройки базы данных
$host = 'localhost';
$dbname = 'lelly.sql';
$username = 'root';
$password = '';



try {
    // Подключение к базе данных
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => "Ошибка подключения к базе данных: " . $e->getMessage()]);
    exit;
}

// Получение данных из POST-запроса
$data = json_decode(file_get_contents("php://input"), true);
if (!$data || empty($data['name']) || empty($data['email']) || empty($data['password'])) {
    echo json_encode(['success' => false, 'message' => "Барлық өрістерді толтырыңыз."]);
    exit;
}

$name = htmlspecialchars($data['name']);
$email = htmlspecialchars($data['email']);
$password = password_hash($data['password'], PASSWORD_DEFAULT); // Хешируем пароль

// Проверка, существует ли пользователь с таким email
$stmt = $pdo->prepare("SELECT * FROM users WHERE email = :email");
$stmt->bindParam(':email', $email);
$stmt->execute();

if ($stmt->rowCount() > 0) {
    echo json_encode(['success' => false, 'message' => "Бұл email-мен пайдаланушы тіркелген."]);
    exit;
}
$password_hashed = password_hash($password, PASSWORD_DEFAULT);

// Добавление нового пользователя
$stmt = $pdo->prepare("INSERT INTO users (username, email, password) VALUES (:name, :email, :password)");
$stmt->bindParam(':name', $name);
$stmt->bindParam(':email', $email);
$stmt->bindParam(':password', $password);

if ($stmt->execute()) {
    echo json_encode(['success' => true, 'message' => "Тіркелу сәтті аяқталды!"]);
} else {
    echo json_encode(['success' => false, 'message' => "Тіркелу кезінде қате пайда болды."]);
}
?>
