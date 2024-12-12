<?php
// Подключение к базе данных
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "lelly.sql"; // Удалено расширение .sql

// Создаем соединение
$conn = new mysqli($servername, $username, $password, $dbname);

// Проверка соединения
if ($conn->connect_error) {
    die("Ошибка подключения: " . $conn->connect_error);
}

// SQL-запрос для получения отзывов с именами пользователей
$sql = "SELECT r.review_text, r.created_at, u.username 
        FROM reviews r
        JOIN users u ON r.user_id = u.id
        ORDER BY r.created_at DESC";

$result = $conn->query($sql);

// Проверка результата
if (!$result) {
    die("Ошибка выполнения запроса: " . $conn->error);
}

// Формируем массив с отзывами
$reviews = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $reviews[] = [
            "name" => $row["username"], // Исправлено: используем username
            "review" => $row["review_text"],
            "created_at" => $row["created_at"]
        ];
    }
} else {
    // Если отзывов нет, возвращаем пустой массив
    $reviews = [];
}

// Возвращаем данные в формате JSON
header("Content-Type: application/json");
echo json_encode($reviews, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);

// Закрытие соединения
$conn->close();
?>
