<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AccessLog extends Model
{
    protected $fillable = [
        'external_person_id',
        'user_id',
        'plant',
        'type',
        'visiting_person',
        'visit_reason',
        'work_area',
        'entry_at',
        'exit_at',
        'item_brand',
        'item_color',
        'item_serial',
        'vehicle_brand',
        'vehicle_plate',
        'notes',
        'signature',
    ];

    public function externalPerson()
    {
        return $this->belongsTo(ExternalPerson::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
