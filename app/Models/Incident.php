<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Incident extends Model
{
    protected $fillable = [
        'user_id',
        'category',
        'description',
        'location',
        'happened_at',
        'involved_person',
        'payroll_number',
        'company',
        'evidence_image',
        'status',
        'resolution_notes',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
