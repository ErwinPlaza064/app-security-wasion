<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PatrolLog extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
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
}
