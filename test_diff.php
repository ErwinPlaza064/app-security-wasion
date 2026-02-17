<?php
require __DIR__ . '/vendor/autoload.php';

use Carbon\Carbon;

$start = Carbon::parse('2026-02-17 09:47:00');
$end = Carbon::parse('2026-02-17 09:48:00');

$diff = $start->diff($end);

$parts = [];
if ($diff->h > 0) $parts[] = $diff->h . 'h';
if ($diff->i > 0) $parts[] = $diff->i . 'm';
$parts[] = $diff->s . 's';

echo "Diff: " . implode(' ', $parts) . "\n";
