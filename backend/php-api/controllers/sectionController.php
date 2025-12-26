<?php

require_once __DIR__ . '/../services/sectionService.php';

function index()
{
    try {
        $sections = getSections();
        echo json_encode([
            "status" => true,
            "data" => $sections
        ]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode([
            "status" => false,
            "message" => $e->getMessage()
        ]);
    }
}
