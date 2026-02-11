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
        'happened_at',
    ];

    /**
     * Get the user who reported the incident.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
