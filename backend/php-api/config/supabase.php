<?php

$env = parse_ini_file(__DIR__ . '/../.env');

return [
    "dsn" => "pgsql:host={$env['DB_HOST']};port={$env['DB_PORT']};dbname={$env['DB_NAME']};sslmode=require",
    "user" => $env['DB_USER'],
    "password" => $env['DB_PASSWORD']
];