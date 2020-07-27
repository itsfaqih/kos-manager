<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Lodging;
use App\Renter;
use App\Room;
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
                ->transform(function ($lodging) {
                    return [
                        'id' => $lodging->id,
                        'renter' => $lodging->renter,
                        'room' => $lodging->room,
                        'start_at' => $lodging->start_at->format('d F Y'),
                        'end_at' => $lodging->end_at->format('d F Y'),
                        'deleted_at' => $lodging->deleted_at,
                    ];
                }),
        ]);
    }

    public function create()
    {
        return Inertia::render('Lodgings/Create', [
            'rooms' => Room::all(),
            'renters' => Renter::all()
        ]);
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

        return Redirect::route('lodgings.index')->with('success', 'Data Penginapan berhasil ditambahkan.');
    }

    public function edit(Lodging $lodging)
    {
        return Inertia::render('Lodgings/Edit', [
            'lodging' => [
                'id' => $lodging->id,
                'renter' => $lodging->renter,
                'room' => $lodging->room,
                'start_at' => $lodging->start_at->format('Y-m-d'),
                'end_at' => $lodging->end_at->format('Y-m-d'),
                'deleted_at' => $lodging->deleted_at,
                'payments' => $lodging->payments->transform(function ($payment) {
                    return [
                        'id' => $payment->id,
                        'item' => $payment->invoice->bill->name,
                        'amount' => $payment->amount,
                        'issued_at' => $payment->invoice->created_at->format('d F Y'),
                        'created_at' => $payment->created_at->format('d F Y'),
                        'deleted_at' => $payment->deleted_at
                    ];
                })
            ],
            'rooms' => Room::all(),
            'renters' => Renter::all(),
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

        return Redirect::back()->with('success', 'Data Penginapan berhasil diperbarui.');
    }

    public function destroy(Lodging $lodging)
    {
        $lodging->delete();

        return Redirect::back()->with('success', 'Data Penginapan berhasil dihapus.');
    }

    public function restore(Lodging $lodging)
    {
        $lodging->restore();

        return Redirect::back()->with('success', 'Data Penginapan berhasil dipulihkan.');
    }
}
