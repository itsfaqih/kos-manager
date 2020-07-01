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
                'nik' => ['required', 'numeric'],
                'name' => ['required', 'string'],
                'gender' => ['required', 'in:Laki-Laki,Perempuan'],
                'phone_number' => ['required', 'numeric'],
                'address' => ['required'],
            ])
        );

        return Redirect::route('renters.index')->with('success', 'Penyewa berhasil ditambahkan.');
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
                'nik' => ['required', 'numeric'],
                'name' => ['required', 'string'],
                'gender' => ['required', 'in:Laki-Laki,Perempuan'],
                'phone_number' => ['required', 'numeric'],
                'address' => ['required'],
            ])
        );

        return Redirect::back()->with('success', 'Penyewa berhasil diperbarui.');
    }

    public function destroy(Renter $renter)
    {
        $renter->delete();

        return Redirect::back()->with('success', 'Penyewa berhasil dihapus.');
    }

    public function restore(Renter $renter)
    {
        $renter->restore();

        return Redirect::back()->with('success', 'Penyewa berhasil dipulihkan.');
    }
    
}

