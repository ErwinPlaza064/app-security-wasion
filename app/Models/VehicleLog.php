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
        'plant',
        'entry_at',
        'exit_at',
        'notes',
    ];

    protected function casts(): array
    {
        return [
            'entry_at' => 'datetime',
            'exit_at' => 'datetime',
        ];
    }

    public function company()
    {
        return $this->belongsTo(Company::class);
    }
}
