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

function getAttempts() {
    $db = getConnection();

    $sql = "SELECT 
                a.id, 
                a.skor, 
                p.id as id_pelajar, 
                p.username, 
                p.nama as nama_pelajar,
                l.id as id_level, 
                l.nama as nama_level,
                s.id as id_section, 
                s.nama as nama_section
            FROM attempts a
            JOIN pelajars p ON p.id = a.id_pelajar
            JOIN levels l ON l.id = a.id_level
            JOIN sections s ON s.id = l.id_section
            ORDER BY a.id DESC";
            
    $stmt = $db->prepare($sql);
    $stmt->execute();
    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Format data to match nested structure expected by frontend (optional but good for consistency)
    // Frontend expects: attempts.pelajars.username, attempts.levels.nama, attempts.levels.sections.nama
    // But SQL returns flat structure.
    // I need to map it.
    
    $formatted = [];
    foreach ($results as $row) {
        $formatted[] = [
            'id' => $row['id'],
            'skor' => $row['skor'],
            'pelajars' => [
                'id' => $row['id_pelajar'],
                'username' => $row['username'],
                'nama' => $row['nama_pelajar']
            ],
            'levels' => [
                'id' => $row['id_level'],
                'nama' => $row['nama_level'],
                'sections' => [
                    'id' => $row['id_section'],
                    'nama' => $row['nama_section']
                ]
            ]
        ];
    }

    return $formatted;
}
