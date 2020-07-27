<?php

namespace App;

use Illuminate\Database\Eloquent\SoftDeletes;

class Invoice extends Model
{
    use SoftDeletes;

    public function bill()
    {
        return $this->belongsTo(Bill::class);
    }

    public function payment()
    {
        return $this->hasOne(Payment::class);
    }

    public function isPaid()
    {
        return $this->payment != null;
    }

    public function scopeFilter($query, array $filters)
    {
        $query->when($filters['search'] ?? null, function ($query, $search) {         
            $query->whereHas('bill', function ($query) use ($search) {
                $query->where('lodging_id', 'like', "$search%");
                $query->orWhere('name', 'like', "$search%");
            });    
            
        })->when($filters['trashed'] ?? null, function ($query, $trashed) {
            if ($trashed === 'with') {
                $query->withTrashed();
            } elseif ($trashed === 'only') {
                $query->onlyTrashed();
            }
        });
    }
}