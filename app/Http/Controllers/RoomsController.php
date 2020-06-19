<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Room;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Redirect;

class RoomsController extends Controller
{
    public function index()
    {
        return Inertia::render('Rooms/Index', [
            'filters' => Request::all('search', 'trashed'),
            'rooms' => Room::orderBy('number')
                ->filter(Request::only('search', 'trashed'))
                ->paginate()
                ->only('id', 'number', 'length', 'width', 'facilities', 'cost_per_month','created_at','deleted_at'),
        ]);
    }

    public function create()
    {
        return Inertia::render('Rooms/Create');
    }

    public function store()
    {
        Room::create(
            Request::validate([
                'number' => ['required', 'max:100'],
                'length' => ['nullable', 'max:50'],
                'width' => ['nullable', 'max:50'],
                'facilities' => ['nullable', 'max:50'],
                'cost_per_month' => ['nullable', 'max:150'],
            ])
        );

        return Redirect::route('rooms')->with('success', 'Kamar berhasil ditambahkan.');
    }

    public function edit(Room $room)
    {
        return Inertia::render('Rooms/Edit', [
            'room' => [
                'id' => $room->id,
                'number' => $room->number,
                'length' => $room->length,
                'width' => $room->width,
                'facilities' => $room->facilites,
                'cost_per_month' => $room->cost_per_month,
                ],
        ]);
    }

    public function update(Room $room)
    {
        $room->update(
            Request::validate(['number' => ['required', 'max:100'],
            'number' => ['nullable', 'max:50', ''],
            'length' => ['nullable', 'max:50', ''],
            'width' => ['nullable', 'max:50', ''],
            'facilities' => ['nullable', 'max:50'],
            'cost_per_month' => ['nullable', 'max:150'],
            ])
        );

        return Redirect::back()->with('success', 'Kamar berhasil diperbarui.');
    }

    public function destroy(Room $room)
    {
        $room->delete();

        return Redirect::back()->with('success', 'Kamar berhasil dihapus.');
    }

    public function restore(Room $room)
    {
        $room->restore();

        return Redirect::back()->with('success', 'Kamar berhasil dipulihkan');
    }
}
