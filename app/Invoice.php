<?php

namespace App;

use Illuminate\Database\Eloquent\SoftDeletes;

class Invoice extends Model
{
    use SoftDeletes;
    // protected $dates = ['start_at', 'end_at'];

    public function bill()
    {
        return $this->belongsTo(Bill::class);
    }

    public function scopeFilter($query, array $filters)
    {
        $query->when($filters['search'] ?? null, function ($query, $search) {
            $query->whereHas('room', function ($query) use ($search) {
                $query->where('number', 'like', "$search%");
            });
            $query->orWhereHas('renter', function ($query) use ($search) {
                $query->where('name', 'like', "$search%");
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