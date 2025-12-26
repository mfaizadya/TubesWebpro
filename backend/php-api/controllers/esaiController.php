<?php
require_once __DIR__ . '/../services/esaiService.php';

function index() {
    try {
        $esai = getSoalEsai();
        echo json_encode([
            "status" => true,
            "data" => $esai
        ]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode([
            "status" => false,
            "message" => $e->getMessage()
        ]);
    }
}