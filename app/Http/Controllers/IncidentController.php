<?php

namespace App\Http\Controllers;

use App\Models\Incident;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class IncidentController extends Controller
{
    public function create(Request $request)
    {
        $category = $request->query('category', 'general');
        $user = Auth::user();

        $areas = \App\Models\Area::where('plant', $user->plant)
            ->orderBy('name')
            ->get();

        return Inertia::render('Operations/Incidents/Create', [
            'category' => $category,
            'areas' => $areas,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'category' => 'required|string|max:255',
            'type' => 'required|string|max:255',
            'description' => 'required|string',
            'location' => 'required|string|max:255',
            'happened_at' => 'required|date',
            'involved_person' => 'nullable|string|max:255',
            'payroll_number' => 'nullable|string|max:20',
            'company' => 'nullable|string|max:255',
            'evidence_image' => 'nullable|image|max:5120', // Máximo 5MB
        ], [
            'type.required' => 'La clasificación del incidente es obligatoria.',
        ]);

        $imagePath = null;
        if ($request->hasFile('evidence_image')) {
            $imagePath = $request->file('evidence_image')->store('incidents-evidence', 'public');
        }

        $incident = Incident::create([
            'user_id' => Auth::id(),
            'category' => $validated['category'],
            'type' => $validated['type'] ?? null,
            'plant' => Auth::user()->plant,
            'description' => $validated['description'],
            'location' => $validated['location'],
            'happened_at' => $validated['happened_at'],
            'involved_person' => $validated['involved_person'],
            'payroll_number' => $validated['payroll_number'] ?? null,
            'company' => $validated['company'] ?? 'WASION',
            'evidence_image' => $imagePath,
            'status' => 'open',
        ]);

        return redirect()->route('dashboard')->with('success', 'Incidencia reportada correctamente.');
    }

    public function resolve(Request $request, Incident $incident)
    {
        $validated = $request->validate([
            'resolution_notes' => 'required|string|min:10',
        ]);

        $incident->update([
            'resolution_notes' => $validated['resolution_notes'],
            'status' => 'resolved',
        ]);

        return redirect()->back()->with('success', 'Incidencia resuelta correctamente.');
    }
}
