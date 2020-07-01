<?php

namespace App\Http\Controllers;

use App\Invoice;
use Inertia\Inertia;
use App\Payment;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Redirect;

class PaymentsController extends Controller
{
    public function index()
    {
        return Inertia::render('Payments/Index', [
            'filters' => Request::all('search', 'trashed'),
            'payments' => Payment::orderBy('id', 'desc')
                ->filter(Request::only('search', 'trashed'))
                ->paginate()
                ->transform(function ($payment) {
                    return [
                        'id' => $payment->id,
                        'description' => $payment->description,
                        'amount' => $payment->amount,
                        'invoice_id' => $payment->invoice_id,
                        'invoice_date' => $payment->invoice->created_at->format('d F Y'),
                        'created_at' => $payment->created_at->format('d F Y'),
                        'deleted_at' => $payment->deleted_at,
                    ];
                }),
                // ->only('id', 'room_id', 'renter_id', 'start_at', 'end_at', 'deleted_at')
        ]);
    }

    public function create()
    {
        return Inertia::render('Payments/Create', [
            'invoices' => Invoice::all(),
        ]);
    }

    public function store()
    {
        Payment::create(
            Request::validate([
                'description' => ['required'],
                'amount' => ['required', 'numeric'],
                'invoice_id' => ['required', 'exists:invoices,id'],
            ])
        );

        return Redirect::route('payments.index')->with('success', 'Data Pembayaran berhasil ditambahkan.');
    }

    public function edit(Payment $payment)
    {
        return Inertia::render('Payments/Edit', [
            'payment' => [
                'id' => $payment->id,
                'description' => $payment->description,
                'amount' => $payment->amount,
                'invoice_id' => $payment->invoice_id,
                'invoice' => $payment->invoice,
                'created_at' => $payment->created_at->format('Y-m-d'),
                'deleted_at' => $payment->deleted_at
            ],
            'invoices' => Invoice::all()->transform(function ($invoice) {
                return [
                    'id' => $invoice->id,
                    'created_at' => $invoice->created_at->format('d F Y'),
                ];
            }),
        ]);
    }

    public function update(Payment $payment)
    {
        $payment->update(
            Request::validate([
                'description' => ['required'],
                'amount' => ['required', 'numeric'],
                'invoice_id' => ['required', 'exists:invoices,id'],
            ])
        );

        return Redirect::back()->with('success', 'Data Pembayaran berhasil diperbarui.');
    }

    public function destroy(Payment $payment)
    {
        $payment->delete();

        return Redirect::back()->with('success', 'Data Pembayaran berhasil dihapus.');
    }

    public function restore(Payment $payment)
    {
        $payment->restore();

        return Redirect::back()->with('success', 'Data Pembayaran berhasil dipulihkan.');
    }
}
