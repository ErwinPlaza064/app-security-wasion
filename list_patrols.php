<?php
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\PatrolLog;

$logs = PatrolLog::latest()->take(10)->get();
foreach ($logs as $p) {
    echo "ID: {$p->id} | Start: {$p->started_at} | End: {$p->happened_at} | Duration: {$p->duration}\n";
}
