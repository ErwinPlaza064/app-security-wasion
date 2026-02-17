<?php
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\PatrolLog;

$p = PatrolLog::latest()->first();
if ($p) {
    echo "ID: " . $p->id . "\n";
    echo "Start: " . $p->started_at . "\n";
    echo "End: " . $p->happened_at . "\n";
    echo "Duration: " . $p->duration . "\n";
} else {
    echo "No patrol logs found.\n";
}
