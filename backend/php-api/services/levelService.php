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

    $sql = "SELECT l.id, l.nama AS nama_level, s.id AS id_section, s.nama AS nama_section 
            FROM levels l
            JOIN sections s on s.id = l.id_section
            ORDER BY s.id ASC";
    $stmt = $db->prepare($sql);
    $stmt->execute();

    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}
