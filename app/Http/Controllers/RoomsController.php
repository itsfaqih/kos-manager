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
                ->only('id', 'number', 'length', 'width', 'facilities', 'cost_per_month', 'created_at', 'deleted_at'),
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
                'number' => ['nullable', 'required', 'between:1,20', 'numeric', 'unique:Rooms,number'],
                'length' => ['nullable', 'required', 'min:1', 'max:8', 'numeric'],
                'width' => ['nullable', 'required', 'min:1', 'max:8', 'numeric'],
                'facilities' => ['nullable', 'required', 'max:25', 'in:AC,Bed,Bathroom,Furniture'],
                'cost_per_month' => ['nullable', 'required', 'min:500000', 'max:10000000', 'numeric'],
            ])
        );

        return Redirect::route('rooms.index')->with('success', 'Kamar berhasil ditambahkan.');
    }

    public function edit(Room $room)
    {
        return Inertia::render('Rooms/Edit', [
            'room' => [
                'id' => $room->id,
                'number' => $room->number,
                'length' => $room->length,
                'width' => $room->width,
                'facilities' => $room->facilities,
                'cost_per_month' => $room->cost_per_month,
                'deleted_at' => $room->deleted_at
            ],
        ]);
    }

    public function update(Room $room)
    {
        $room->update(
            Request::validate([
                'number' => ['nullable', 'required', 'unique:Rooms,number'],
                'length' => ['nullable', 'required', 'min:1', 'max:8', 'numeric'],
                'width' => ['nullable', 'required', 'min:1', 'max:8', 'numeric'],
                'facilities' => ['nullable', 'required', 'in:AC,Bed,Bathroom,Furniture'],
                'cost_per_month' => ['nullable', 'required', 'numeric'],
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
