<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Bill;
use App\Lodging;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Redirect;

class BillsController extends Controller
{
    public function index()
    {
        return Inertia::render('Bills/Index', [
            'filters' => Request::all('search', 'trashed'),
            'bills' => Bill::orderBy('name')
                ->filter(Request::only('search', 'trashed'))
                ->paginate()
                ->only('id', 'lodging_id', 'name', 'description', 'amount', 'per_month', 'deleted_at'),
        ]);
    }

    public function create()
    {
        return Inertia::render('Bills/Create', [
            'lodgings' => Lodging::all(),
        ]);
    }

    public function store()
    {
        Bill::create(
            Request::validate([
                'lodging_id' => ['required', 'exists:lodgings,id'],
                'name' => ['required', 'string'],
                'description' => ['required'],
                'amount' => ['required', 'numeric'],
                'per_month' => ['required', 'numeric'],
            ])
        );

        return Redirect::route('bills.index')->with('success', 'Data Tagihan berhasil ditambahkan.');
    }

    public function edit(Bill $bill)
    {
        return Inertia::render('Bills/Edit', [
            'bill' => [
                'id' => $bill->id,
                'lodging_id' => $bill->lodging_id,
                'name' => $bill->name,
                'description' => $bill->description,
                'amount' => $bill->amount,
                'per_month' => $bill->per_month,
                'deleted_at' => $bill->deleted_at,
            ],
            'lodgings' => Lodging::all(),
        ]);
    }

    public function update(Bill $bill)
    {
        $bill->update(
            Request::validate([
                'lodging_id' => ['required', 'exists:lodgings,id'],
                'name' => ['required', 'string'],
                'description' => ['required'],
                'amount' => ['required', 'numeric'],
                'per_month' => ['required', 'numeric'],
            ])
        );

        return Redirect::back()->with('success', 'Data Tagihan berhasil diperbarui.');
    }

    public function destroy(Bill $bill)
    {
        $bill->delete();

        return Redirect::back()->with('success', 'Data Tagihan berhasil dihapus.');
    }

    public function restore(Bill $bill)
    {
        $bill->restore();

        return Redirect::back()->with('success', 'Data Tagihan berhasil dipulihkan.');
    }
    
}

