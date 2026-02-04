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
        'documentation_status',
        'plant',
        'user_id'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
