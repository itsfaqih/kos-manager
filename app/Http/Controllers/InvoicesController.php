<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Invoice;
use App\Bill;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Redirect;
use SebastianBergmann\Environment\Console;

class InvoicesController extends Controller
{
    public function index()
    {
        return Inertia::render('Invoices/Index', [
            'filters' => Request::all('search', 'trashed'),
            'invoices' => Invoice::orderBy('id', 'desc')
                ->filter(Request::only('search', 'trashed'))
                ->paginate()
                ->transform(function ($invoice) {
                    return [
                        'id' => $invoice->id,
                        'renter' => $invoice->bill->lodging->renter,
                        'room' => $invoice->bill->lodging->room,
                        'bill' => $invoice->bill,
                        'deleted_at' => $invoice->deleted_at,
                        'created_at' => $invoice->created_at->format('d F Y'),
                        'paid' => $invoice->isPaid()
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

        return Redirect::route('invoices.index')->with('success', 'Data Penagihan berhasil ditambahkan.');
    }

    public function edit(Invoice $invoice)
    {
        return Inertia::render('Invoices/Edit', [
            'invoice' => [
                'id' => $invoice->id,
                'bill_id' => $invoice->bill_id,
                'deleted_at' => $invoice->deleted_at,
            ],
            'bills' => Bill::all(),

        ]);
    }

    public function update(Invoice $invoice)
    {
        $invoice->update(
            Request::validate([
                'bill_id' => ['required', 'exists:bills,id']
            ])
        );

        return Redirect::back()->with('success', 'Data Penagihan berhasil diperbarui.');
    }

    public function destroy(Invoice $invoice)
    {
        $invoice->delete();

        return Redirect::back()->with('success', 'Data Penagihan berhasil dihapus.');
    }

    public function restore(Invoice $invoice)
    {
        $invoice->restore();

        return Redirect::back()->with('success', 'Data Penagihan berhasil dipulihkan.');
    }
}
