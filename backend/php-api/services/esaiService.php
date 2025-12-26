<?php
$config = require __DIR__ . '/../config/supabase.php';

function getConnection() {
    global $config;
    return new PDO(
        $config['dsn'],
        $config['user'],
        $config['password'],
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );
}

function getSoalEsai() {
    $db = getConnection();
    $sql = "SELECT s.*, l.nama AS nama_level 
            FROM soals s
            JOIN levels l ON l.id = s.id_level
            WHERE s.tipe = 'esai'
            ORDER BY s.id DESC";
            
    $stmt = $db->prepare($sql);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}