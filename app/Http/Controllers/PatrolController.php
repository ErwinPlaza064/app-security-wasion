<?php

namespace App\Http\Controllers;

use App\Models\PatrolLog;
use App\Models\Area;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class PatrolController extends Controller
{
    public function create()
    {
        return Inertia::render('Operations/Patrols/Create', [
            'areas' => Area::all(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'area_name' => 'required|string',
            'status' => 'required|in:ok,incident',
            'notes' => 'nullable|string',
            'evidence_image' => 'nullable|string',
            'started_at' => 'required|date',
            'happened_at' => 'required|date',
        ]);

        $imagePath = null;
        if ($request->filled('evidence_image') && str_contains($request->evidence_image, 'data:image')) {
            $imageData = $request->evidence_image;
            $image = str_replace('data:image/png;base64,', '', $imageData);
            $image = str_replace(' ', '+', $image);
            $imageName = 'patrol_' . time() . '.png';
            Storage::disk('public')->put('patrols/' . $imageName, base64_decode($image));
            $imagePath = 'storage/patrols/' . $imageName;
        }

        PatrolLog::create([
            'user_id' => auth()->id(),
            'started_at' => $validated['started_at'],
            'area_name' => $validated['area_name'],
            'status' => $validated['status'],
            'notes' => $validated['notes'],
            'evidence_image' => $imagePath,
            'happened_at' => $validated['happened_at'],
        ]);

        return redirect()->route('dashboard')->with('success', 'Rondín registrado correctamente.');
    }
}
