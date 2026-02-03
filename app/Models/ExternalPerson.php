<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ExternalPerson extends Model
{
    protected $fillable = ['full_name', 'company_id', 'id_number', 'phone'];

    public function company()
    {
        return $this->belongsTo(Company::class);
    }

    public function accessLogs()
    {
        return $this->hasMany(AccessLog::class);
    }
}
