<?php
session_start();

// Уничтожаем все данные сессии
session_unset();
session_destroy();

// Возвращаем ответ
echo json_encode(["success" => true]);
?>
