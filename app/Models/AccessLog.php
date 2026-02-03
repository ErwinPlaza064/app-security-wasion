<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AccessLog extends Model
{
    protected $fillable = [
        'external_person_id',
        'type',
        'entry_at',
        'exit_at',
        'item_brand',
        'item_color',
        'item_serial',
        'notes',
        'signature',
    ];

    public function externalPerson()
    {
        return $this->belongsTo(ExternalPerson::class);
    }
}
