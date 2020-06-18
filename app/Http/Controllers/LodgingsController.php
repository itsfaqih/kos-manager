<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Lodging;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Redirect;

class LodgingsController extends Controller
{
    public function index()
    {
        return Inertia::render('Lodgings/Index', [
            'filters' => Request::all('search', 'trashed'),
            'lodgings' => Lodging::orderBy('id', 'desc')
                ->filter(Request::only('search', 'trashed'))
                ->paginate()
                // ->only('id', 'room_id', 'renter_id', 'start_at', 'end_at', 'deleted_at')
        ]);
    }

    public function create()
    {
        return Inertia::render('Lodgings/Create');
    }

    public function store()
    {
        Lodging::create(
            Request::validate([
                'renter_id' => ['required', 'exists:renters,id'],
                'room_id' => ['required', 'exists:rooms,id'],
                'start_at' => ['required', 'date'],
                'end_at' => ['required', 'date'],
            ])
        );

        return Redirect::route('lodgings')->with('success', 'Lodging created.');
    }

    public function edit(Lodging $lodging)
    {
        return Inertia::render('Lodgings/Edit', [
            'lodging' => [
                'id' => $lodging->id,
                'renter_id' => $lodging->renter_id,
                'room_id' => $lodging->room_id,
                'start_at' => $lodging->start_at,
                'end_at' => $lodging->end_at,                
            ],
        ]);
    }

    public function update(Lodging $lodging)
    {
        $lodging->update(
            Request::validate([
                'renter_id' => ['required', 'exists:renters,id'],
                'room_id' => ['required', 'exists:rooms,id'],
                'start_at' => ['required', 'date'],
                'end_at' => ['required', 'date'],
            ])
        );

        return Redirect::back()->with('success', 'Lodging updated.');
    }

    public function destroy(Lodging $lodging)
    {
        $lodging->delete();

        return Redirect::back()->with('success', 'Lodging deleted.');
    }

    public function restore(Lodging $lodging)
    {
        $lodging->restore();

        return Redirect::back()->with('success', 'Lodging restored.');
    }
}
