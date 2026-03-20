<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Incident extends Model
{
    protected $fillable = [
        'user_id',
        'category',
        'type',
        'description',
        'location',
        'happened_at',
        'involved_person',
        'plant',
        'payroll_number',
        'company',
        'evidence_image',
        'status',
        'resolution_notes',
    ];

    protected function casts(): array
    {
        return [
            'happened_at' => 'datetime',
        ];
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
