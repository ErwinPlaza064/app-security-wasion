<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ExitVoucher extends Model
{
    protected $fillable = [
        'folio',
        'recipient_name',
        'reference_number',
        'is_fixed_asset',
        'voucher_date',
        'concept',
        'other_concept_details',
        'exit_date',
        'return_date',
        'user_id',
        'status',
        'approved_by_head_at',
        'approved_by_area_at',
        'approved_by_finance_at',
        'approved_by_general_at',
        'received_by_security_at',
        'actual_return_date',
        'closed_by_user_id',
        'plant'
    ];

    protected $casts = [
        'is_fixed_asset' => 'boolean',
        'voucher_date' => 'date',
        'exit_date' => 'date',
        'return_date' => 'date',
        'actual_return_date' => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function items()
    {
        return $this->hasMany(ExitVoucherItem::class);
    }

    public function closedBy()
    {
        return $this->belongsTo(User::class, 'closed_by_user_id');
    }
}
