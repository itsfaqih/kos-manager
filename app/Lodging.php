<?php

namespace App;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\SoftDeletes;

class Lodging extends Model
{
    use SoftDeletes;
    protected $dates = ['start_at', 'end_at'];

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

    public function scopeActive($query)
    {
        $query->whereDate('end_at', '>', Carbon::now());
    }
}
