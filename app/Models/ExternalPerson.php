<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ExternalPerson extends Model
{
    protected $fillable = ['full_name', 'company_id', 'id_number', 'phone'];

    public function setIdNumberAttribute($value)
    {
        if ($value) {
            $upper = mb_strtoupper(trim($value), 'UTF-8');
            if ($upper === 'BOCA' || $upper === 'TENGO' || $upper === 'TENGO DE ENTRADA' || $upper === 'I') {
                $value = 'INE';
            }
        }
        $this->attributes['id_number'] = $value;
    }

    public function company()
    {
        return $this->belongsTo(Company::class);
    }

    public function accessLogs()
    {
        return $this->hasMany(AccessLog::class);
    }
}
