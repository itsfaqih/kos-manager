<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Invoice;
use App\Bill;
use App\Renter;
use App\Room;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Redirect;

class InvoicesController extends Controller
{
    public function index()
    {
        return Inertia::render('Invoices/Index', [
            'filters' => Request::all('search', 'trashed'),
            'Invoices' => Invoice::orderBy('id', 'desc')
                ->filter(Request::only('search', 'trashed'))
                ->paginate()
                ->transform(function ($invoice) {
                    return [
                        'id' => $invoice->id,
                        'bill_id' => $invoice->bill_id,
                    ];
                }),
                // ->only('id', 'room_id', 'renter_id', 'start_at', 'end_at', 'deleted_at')
        ]);
    }

    public function create()
    {
        return Inertia::render('Invoices/Create', [
            'bills' => Bill::all()
        ]);
    }

    public function store()
    {
        Invoice::create(
            Request::validate([
                'bill_id' => ['required', 'exists:bills,id'],
            ])
        );

        return Redirect::route('invoices.index')->with('success', 'Data Penginapan berhasil ditambahkan.');
    }

    public function edit(Invoice $invoice)
    {
        return Inertia::render('Lodgings/Edit', [
            'lodging' => [
                'id' => $lodging->id,
                'renter' => $lodging->renter,
                'room' => $lodging->room,
                'start_at' => $lodging->start_at->format('Y-m-d'),
                'end_at' => $lodging->end_at->format('Y-m-d'),
                'deleted_at' => $lodging->deleted_at
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
