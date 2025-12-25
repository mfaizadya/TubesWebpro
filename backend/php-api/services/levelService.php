<?php

$config = require __DIR__ . '/../config/supabase.php';

function getConnection() {
    global $config;

    return new PDO(
        $config['dsn'],
        $config['user'],
        $config['password'],
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
        ]
    );
}

function getLevels() {
    $db = getConnection();

    $sql = "SELECT * 
            FROM levels l";
    $stmt = $db->prepare($sql);
    $stmt->execute();

    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}
