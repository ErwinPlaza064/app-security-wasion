<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SecuritySpecialLog extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'type',
        'employee_name',
        'employee_id',
        'department',
        'position',
        'suspension_reason',
        'direct_supervisor',
        'notes',
        'happened_at',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
