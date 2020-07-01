<?php

namespace App;

use Illuminate\Database\Eloquent\SoftDeletes;

class Payment extends Model
{
    use SoftDeletes;
    
    public function invoice()
    {
        return $this->belongsTo(Invoice::class);
    }

    public function scopeFilter($query, array $filters)
    {
        $query->when($filters['search'] ?? null, function ($query, $search) {
            $query->where('invoice_id', 'like', "%$search$");
            $query->orWhere('description', 'like', "%$search$");
            $query->orWhere('amount', 'like', "%$search$");
        })->when($filters['trashed'] ?? null, function ($query, $trashed) {
            if ($trashed === 'with') {
                $query->withTrashed();
            } elseif ($trashed === 'only') {
                $query->onlyTrashed();
            }
        });
    }
}
