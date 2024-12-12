<?php
// Подключение к базе данных
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "lelly.sql";

$conn = new mysqli($servername, $username, $password, $dbname);

// Проверка соединения
if ($conn->connect_error) {
    die("Ошибка подключения: " . $conn->connect_error);
}

// Чтение данных из запроса
$input = file_get_contents("php://input");
$data = json_decode($input, true);

// Проверяем, что пользователь авторизован и данные корректны
if (!empty($data['review']) && !empty($data['email'])) {
    $review = $conn->real_escape_string($data['review']); // Защита от SQL-инъекций
    $email = $conn->real_escape_string($data['email']); // Email пользователя

    // Проверка, существует ли пользователь с таким email
    $userCheckQuery = "SELECT id FROM users WHERE email = '$email'";
    $result = $conn->query($userCheckQuery);

    if ($result->num_rows > 0) {
        $userId = $result->fetch_assoc()['id'];

        // SQL-запрос для вставки отзыва
        $sql = "INSERT INTO reviews (user_id, review_text, created_at) VALUES ('$userId', '$review', NOW())";

        if ($conn->query($sql) === TRUE) {
            echo json_encode(["success" => true]);
        } else {
            echo json_encode(["success" => false, "message" => "Ошибка сохранения: " . $conn->error]);
        }
    } else {
        echo json_encode(["success" => false, "message" => "Пользователь не найден."]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Данные не могут быть пустыми."]);
}

// Закрытие соединения
$conn->close();
?>
