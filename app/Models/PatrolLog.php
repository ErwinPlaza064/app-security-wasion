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

        $parts = [];
        if ($diff->h > 0) $parts[] = $diff->h . 'h';
        if ($diff->i > 0) $parts[] = $diff->i . 'm';
        $parts[] = $diff->s . 's';

        return implode(' ', $parts);
    }
}
