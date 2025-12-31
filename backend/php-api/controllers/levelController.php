<?php

require_once __DIR__ . '/../services/levelService.php';

function index()
{
    try {
        if (!isset($_GET['slug'])) {
            http_response_code(400);
            echo json_encode([
                "status" => false,
                "message" => "slug is required"
            ]);
            return;
        }

        $slug = $_GET['slug'];
        $levels = getLevelsBySectionSlug($slug);
        // var_dump($levels);
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
