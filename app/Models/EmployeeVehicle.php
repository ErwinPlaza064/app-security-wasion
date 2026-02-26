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
        'plant',
        'user_id'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
