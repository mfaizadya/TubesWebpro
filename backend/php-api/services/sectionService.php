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

function getSections() {
    $db = getConnection();

    $sql = "SELECT s.id, s.nama, s.slug, 
            (SELECT COUNT(*) FROM levels l WHERE l.id_section = s.id) AS jumlah_level
            FROM sections s
            ORDER BY s.id ASC";
    $stmt = $db->prepare($sql);
    $stmt->execute();

    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}
