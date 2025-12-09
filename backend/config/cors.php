<?php

return [
    'paths' => ['api/*', 'sanctum/csrf-cookie', '*'],

    'allowed_origins' => [
        'http://localhost:3000',
        'http://127.0.0.1:3000',
        'http://localhost',
        'http://localhost:8000',
        'http://127.0.0.1:8000',
    ],

    'supports_credentials' => true,
    'allowed_methods' => ['*'],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
];
