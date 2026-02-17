<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PatrolLog extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'plant',
        'started_at',
        'area_name',
        'status',
        'notes',
        'evidence_image',
        'happened_at',
    ];

    protected $casts = [
        'started_at' => 'datetime',
        'happened_at' => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function getDurationAttribute()
    {
        if (!$this->started_at || !$this->happened_at) {
            return 'N/A';
        }

        $diff = $this->started_at->diff($this->happened_at);

        // Si la diferencia es de 0 segundos, mostrar 0s
        if ($diff->h === 0 && $diff->i === 0 && $diff->s === 0) {
            return '0s';
        }

        $parts = [];
        if ($diff->h > 0) $parts[] = $diff->h . 'h';
        if ($diff->i > 0) $parts[] = $diff->i . 'm';
        if ($diff->s > 0 || empty($parts)) $parts[] = $diff->s . 's';

        return implode(' ', $parts);
    }
}
