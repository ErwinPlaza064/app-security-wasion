<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ExitVoucherItem extends Model
{
    protected $fillable = [
        'exit_voucher_id',
        'description',
        'quantity',
        'unit'
    ];

    public function exitVoucher()
    {
        return $this->belongsTo(ExitVoucher::class);
    }
}
