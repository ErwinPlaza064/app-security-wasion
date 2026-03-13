<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class VehicleIncident extends Model
{
    protected $fillable = [
        'user_id',
        'title',
        'description',
        'plant',
        'area',
        'happened_at',
    ];

    protected function casts(): array
    {
        return [
            'happened_at' => 'datetime',
        ];
    }

    /**
     * Get the user who reported the incident.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
