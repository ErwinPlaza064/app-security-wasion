<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class SpecialLogController extends Controller
{
    public function create(Request $request)
    {
        $type = $request->query('type', 'no_badge');

        return Inertia::render('Operations/SpecialLogs/Create', [
            'type' => $type,
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
            'notes' => 'nullable|string',
            'happened_at' => 'required|date',
        ]);

        DB::table('security_special_logs')->insert([
            'user_id' => Auth::id(),
            'type' => $validated['type'],
            'employee_name' => $validated['employee_name'],
            'employee_id' => $validated['employee_id'],
            'department' => $validated['department'],
            'position' => $validated['position'],
            'notes' => $validated['notes'],
            'happened_at' => $validated['happened_at'],
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return redirect()->route('dashboard')->with('status', 'Registro especial guardado correctamente.');
    }
}
