<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EmployeeVehicle extends Model
{
    protected $fillable = [
        'marbete_number',
        'employee_name',
        'area',
        'vehicle_brand',
        'vehicle_model',
        'vehicle_plates',
        'vehicle_brand_2',
        'vehicle_model_2',
        'vehicle_plates_2',
        'documentation_status',
        'validity_status',
        'has_driver_license',
        'driver_license_expires_at',
        'has_circulation_card',
        'has_insurance',
        'insurance_expires_at',
        'plant',
        'user_id'
    ];

    protected $casts = [
        'has_driver_license' => 'boolean',
        'driver_license_expires_at' => 'date',
        'has_circulation_card' => 'boolean',
        'has_insurance' => 'boolean',
        'insurance_expires_at' => 'date',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
