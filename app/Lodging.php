<?php

namespace App;

use Illuminate\Database\Eloquent\SoftDeletes;

class Lodging extends Model
{
    use SoftDeletes;

    public function renter()
    {
        return $this->belongsTo(Renter::class);
    }

    public function room()
    {
        return $this->belongsTo(Room::class);
    }

    public function scopeFilter($query, array $filters)
    {
        $query->when($filters['search'] ?? null, function ($query, $search) {
            $query->whereHas('rooms', function ($query, $search) {
                $query->where('number', 'like', "$search%");
            });
            $query->orWhereHas('renters', function ($query, $search) {
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
