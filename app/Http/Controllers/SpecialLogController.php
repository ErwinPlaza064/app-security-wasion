<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

use App\Models\Area;

class SpecialLogController extends Controller
{
    public function create(Request $request)
    {
        $type = $request->query('type', 'no_badge');
        $user = Auth::user();

        $areas = Area::where('plant', $user->plant)
            ->orderBy('name')
            ->get();

        return Inertia::render('Operations/SpecialLogs/Create', [
            'type' => $type,
            'areas' => $areas,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'type' => 'required|in:resignation,no_badge,clearance',
            'employee_name' => 'required|string|max:255',
            'employee_id' => 'nullable|string|max:255',
            'department' => 'nullable|string|max:255',
            'position' => 'nullable|string|max:255',
            'suspension_reason' => 'nullable|string|max:255',
            'direct_supervisor' => 'nullable|string|max:255',
            'notes' => 'nullable|string',
            'happened_at' => 'required|date',
        ]);

        \App\Models\SecuritySpecialLog::create([
            'user_id' => Auth::id(),
            'type' => $validated['type'],
            'plant' => Auth::user()->plant,
            'employee_name' => $validated['employee_name'],
            'employee_id' => $validated['employee_id'],
            'department' => $validated['department'],
            'position' => $validated['position'],
            'suspension_reason' => $validated['suspension_reason'] ?? null,
            'direct_supervisor' => $validated['direct_supervisor'] ?? null,
            'notes' => $validated['notes'],
            'happened_at' => $validated['happened_at'],
        ]);

        return redirect()->route('dashboard')->with('status', 'Registro especial guardado correctamente.');
    }
}
