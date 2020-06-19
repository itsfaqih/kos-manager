<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Renter;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Redirect;

class RentersController extends Controller
{
    public function index()
    {
        return Inertia::render('Renters/Index', [
            'filters' => Request::all('search', 'trashed'),
            'renters' => Renter::orderBy('name')
                ->filter(Request::only('search', 'trashed'))
                ->paginate()
                ->only('id', 'nik', 'name', 'gender', 'phone_number', 'address', 'deleted_at'),
        ]);
    }

    public function create()
    {
        return Inertia::render('Renters/Create');
    }

    public function store()
    {
        Renter::create(
            Request::validate([
                'nik' => ['required'],
                'name' => ['required'],
                'gender' => ['nullable'],
                'phone_number' => ['nullable'],
                'address' => ['nullable'],
            ])
        );

        return Redirect::route('renters')->with('success', 'Renter created.');
    }

    public function edit(Renter $renter)
    {
        return Inertia::render('Renters/Edit', [
            'renter' => [
                'id' => $renter->id,
                'nik' => $renter->nik,
                'name' => $renter->name,
                'gender' => $renter->gender,
                'phone_number' => $renter->phone_number,
                'address' => $renter->address,
                'deleted_at' => $renter->deleted_at,
            ],
        ]);
    }

    public function update(Renter $renter)
    {
        $renter->update(
            Request::validate([
                'nik' => ['required'],
                'name' => ['required'],
                'gender' => ['nullable'],
                'phone_number' => ['nullable'],
                'address' => ['nullable'],
            ])
        );

        return Redirect::back()->with('success', 'Renter updated.');
    }

    public function destroy(Renter $renter)
    {
        $renter->delete();

        return Redirect::back()->with('success', 'Renter deleted.');
    }

    public function restore(Renter $renter)
    {
        $renter->restore();

        return Redirect::back()->with('success', 'Renter restored.');
    }
    
}

