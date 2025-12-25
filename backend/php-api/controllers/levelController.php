<?php

require_once __DIR__ . '/../services/levelService.php';

function index()
{
    try {
        $levels = getLevels();

        echo json_encode([
            "status" => true,
            "data" => $levels
        ]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode([
            "status" => false,
            "message" => $e->getMessage()
        ]);
    }
}
