<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    protected $fillable = ['name', 'legal_name', 'tax_id', 'is_active'];

    public function externalPeople()
    {
        return $this->hasMany(ExternalPerson::class);
    }

    public function vehicleLogs()
    {
        return $this->hasMany(VehicleLog::class);
    }

    public function supplierMeetings()
    {
        return $this->hasMany(SupplierMeeting::class);
    }
}
