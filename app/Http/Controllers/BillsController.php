<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Bill;
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
                ->only('id', 'name', 'description', 'amount', 'per_month', 'deleted_at'),
        ]);
    }

    public function create()
    {
        return Inertia::render('Bills/Create');
    }

    public function store()
    {
        Bill::create(
            Request::validate([
                'name' => ['required'],
                'description' => ['required'],
                'amount' => ['required'],
                'per_month' => ['required'],
            ])
        );

        return Redirect::route('bills.index')->with('success', 'Bill created.');
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
        ]);
    }

    public function update(Bill $bill)
    {
        $bill->update(
            Request::validate([
                'name' => ['required'],
                'description' => ['required'],
                'amount' => ['required'],
                'per_month' => ['required'],
            ])
        );

        return Redirect::back()->with('success', 'Bill updated.');
    }

    public function destroy(Bill $bill)
    {
        $bill->delete();

        return Redirect::back()->with('success', 'Bill deleted.');
    }

    public function restore(Bill $bill)
    {
        $bill->restore();

        return Redirect::back()->with('success', 'bill restored.');
    }
    
}

