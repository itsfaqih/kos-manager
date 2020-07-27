<?php

namespace App\Http\Controllers;

use App\Lodging;
use App\Renter;
use App\Room;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function __invoke()
    {
        return Inertia::render('Dashboard/Index', [
            'counts' => [
                'rooms' => Room::available()->count(),
                'renters' => Renter::active()->count(),
                'lodgings' => Lodging::active()->count()
            ]
        ]);
    }
}
