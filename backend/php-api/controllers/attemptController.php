<?php

require_once __DIR__ . '/../services/attemptService.php';

function index()
{
    try {
        $attempts = getAttempts();
        
        echo json_encode([
            "payload" => [
                "statusCode" => 200,
                "datas" => $attempts,
                "message" => "Berhasil mendapatkan semua attempt (PHP)"
            ]
        ]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode([
            "payload" => [
                "statusCode" => 500,
                "datas" => null,
                "message" => "Terjadi kesalahan server: " . $e->getMessage()
            ]
        ]);
    }
}
