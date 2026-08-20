<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SupplierMeeting extends Model
{
    protected $fillable = [
        'meeting_date',
        'meeting_time',
        'company_id',
        'company_name',
        'plant',
        'subject',
        'attendees',
        'minutes',
        'user_id',
    ];

    protected $casts = [
        'meeting_date' => 'date',
    ];

    public function company()
    {
        return $this->belongsTo(Company::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function getSupplierNameAttribute(): string
    {
        return $this->company?->name ?? $this->company_name ?? 'Sin especificar';
    }
}
