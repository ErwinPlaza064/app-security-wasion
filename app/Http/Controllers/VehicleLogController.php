<?php

namespace App\Http\Controllers;

use App\Models\VehicleLog;
use App\Models\Company;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VehicleLogController extends Controller
{
    public function create(Request $request)
    {
        $operation = $request->query('operation', 'transport');
        $companies = Company::where('is_active', true)->orderBy('name')->get();

        return Inertia::render('Operations/VehicleLogs/Create', [
            'operation' => $operation,
            'companies' => $companies,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'plates' => 'required|string|max:20',
            'brand' => 'nullable|string|max:255',
            'model' => 'nullable|string|max:255',
            'driver_name' => 'required|string|max:255',
            'company_id' => 'nullable|exists:companies,id',
            'new_company' => 'nullable|string|max:255',
            'operation' => 'required|in:load,unload,transport,visit',
            'notes' => 'nullable|string',
        ]);

        $companyId = $validated['company_id'];
        if (!$companyId && !empty($validated['new_company'])) {
            $company = Company::create(['name' => $validated['new_company']]);
            $companyId = $company->id;
        }

        VehicleLog::create([
            'plates' => strtoupper($validated['plates']),
            'brand' => $validated['brand'],
            'model' => $validated['model'],
            'driver_name' => $validated['driver_name'],
            'company_id' => $companyId,
            'operation' => $validated['operation'],
            'entry_at' => now(),
            'notes' => $validated['notes'],
        ]);

        return redirect()->route('dashboard')->with('status', 'Registro vehicular guardado correctamente.');
    }
}
