<?php

namespace App;

use Illuminate\Database\Eloquent\SoftDeletes;

class Room extends Model
{
    use SoftDeletes;

    public function lodgings()
    {
        return $this->hasMany(Lodging::class);
    }

    public function scopeFilter($query, array $filters)
    {
        $query->when($filters['search'] ?? null, function ($query, $search) {
            $query->where('number', 'like', '%'.$search.'%');
        })->when($filters['trashed'] ?? null, function ($query, $trashed) {
            if ($trashed === 'with') {
                $query->withTrashed();
            } elseif ($trashed === 'only') {
                $query->onlyTrashed();
            }
        });
    }

    public function scopeUsed($query)
    {
        $query->whereHas('lodgings', function ($query) {
            $query->active();
        });
    }

    public function scopeAvailable($query)
    {
        $query->whereDoesntHave('lodgings', function ($query) {
            $query->active();
        });
    }
}
