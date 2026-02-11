<?php

namespace App\Http\Controllers\Operations;

use App\Http\Controllers\Controller;
use App\Models\VehicleIncident;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class VehicleIncidentController extends Controller
{
    /**
     * Show the form for creating a new vehicle incident.
     */
    public function create()
    {
        return Inertia::render('Operations/VehicleRegistry/Incidents/Create');
    }

    /**
     * Store a newly created vehicle incident in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
        ]);

        VehicleIncident::create([
            'user_id' => Auth::id(),
            'title' => $validated['title'],
            'description' => $validated['description'],
            'plant' => Auth::user()->plant,
            'happened_at' => now(),
        ]);

        return redirect()->route('dashboard')->with('status', 'Incidencia vehicular registrada correctamente.');
    }
}
