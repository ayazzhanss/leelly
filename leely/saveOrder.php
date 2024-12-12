<?php
// Подключение к базе данных
$host = 'localhost';
$db = 'lelly.sql';
$user = 'root';
$password = '';

$conn = new mysqli($host, $user, $password, $db);

// Проверяем подключение
if ($conn->connect_error) {
    die(json_encode(['success' => false, 'message' => 'Қосылу қатесі: ' . $conn->connect_error]));
}

// Читаем данные из POST-запроса
$data = json_decode(file_get_contents('php://input'), true);

$email = $data['email'];
$items = json_encode($data['items']); // Конвертируем массив товаров в JSON для хранения
$total = $data['total'];
$date = $data['date'];

// Вставляем данные в базу
$query = "INSERT INTO orders (email, items, total, date) VALUES (?, ?, ?, ?)";
$stmt = $conn->prepare($query);
$stmt->bind_param("ssis", $email, $items, $total, $date);

if ($stmt->execute()) {
    echo json_encode(['success' => true, 'message' => 'Тапсырыс сәтті сақталды.']);
} else {
    echo json_encode(['success' => false, 'message' => 'Тапсырысты сақтау қатесі: ' . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
