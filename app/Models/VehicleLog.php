<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VehicleLog extends Model
{
    protected $fillable = [
        'plates',
        'brand',
        'model',
        'driver_name',
        'company_id',
        'operation',
        'entry_at',
        'exit_at',
        'notes',
    ];

    public function company()
    {
        return $this->belongsTo(Company::class);
    }
}
