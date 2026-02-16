<?php

namespace App\Http\Controllers;

use App\Models\AccessLog;
use App\Models\Company;
use App\Models\ExternalPerson;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AccessLogController extends Controller
{
    public function dashboard()
    {
        $user = auth()->user();

        $activeVisitorsQuery = AccessLog::whereNull('exit_at')
            ->with(['externalPerson.company'])
            ->latest('entry_at');

        $activeVehiclesQuery = \App\Models\VehicleLog::whereNull('exit_at')
            ->with(['company'])
            ->latest('entry_at');

        // Si no es admin/superadmin, filtrar por planta
        if (!$user->isAdmin()) {
            $activeVisitorsQuery->where('plant', $user->plant);
            $activeVehiclesQuery->where('plant', $user->plant);
        }

        return Inertia::render('Dashboard', [
            'activeVisitors' => $activeVisitorsQuery->get(),
            'activeVehicles' => $activeVehiclesQuery->get(),
        ]);
    }

    public function create(Request $request)
    {
        $type = $request->query('type', 'visitor');
        $companies = Company::where('is_active', true)->orderBy('name')->get();

        // Filtrar áreas por la planta del guardia actual
        $userPlant = auth()->user()->plant;
        $areas = \App\Models\Area::where('plant', $userPlant)
            ->orderBy('name')
            ->get();

        return Inertia::render('Operations/AccessLogs/Create', [
            'type' => $type,
            'companies' => $companies,
            'areas' => $areas,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            // General record data
            'type' => 'required|in:visitor,supplier,contractor,laptop_only,employee_laptop',
            'company_id' => 'nullable|exists:companies,id',
            'new_company' => 'nullable|string|max:255',
            'visiting_person' => 'nullable|string|max:255',
            'visit_reason' => 'nullable|string|max:255',
            'work_area' => 'nullable|string|max:255',
            'vehicle_brand' => 'nullable|string|max:255',
            'vehicle_plate' => 'nullable|string|max:255',
            'notes' => 'nullable|string',

            // Individual group members
            'visitors' => 'required|array|min:1',
            'visitors.*.full_name' => 'required|string|max:255',
            'visitors.*.id_number' => 'nullable|string|max:255',
            'visitors.*.item_brand' => 'nullable|string|max:255',
            'visitors.*.item_color' => 'nullable|string|max:255',
            'visitors.*.item_serial' => 'nullable|string|max:255',
            'visitors.*.signature' => 'nullable|string',
        ]);

        // Process shared company
        $currentCompanyId = $validated['company_id'] ?? null;
        if (!$currentCompanyId && !empty($validated['new_company'])) {
            $company = Company::create(['name' => $validated['new_company']]);
            $currentCompanyId = $company->id;
        }

        foreach ($validated['visitors'] as $visitorData) {
            // Find or create person with shared company
            $externalPerson = ExternalPerson::firstOrCreate(
                [
                    'full_name' => $visitorData['full_name'],
                    'company_id' => $currentCompanyId
                ],
                [
                    'id_number' => $visitorData['id_number'],
                ]
            );

            // Create individual log with shared group data + personal data
            $log = AccessLog::create([
                'external_person_id' => $externalPerson->id,
                'user_id' => auth()->id(),
                'plant' => auth()->user()->plant,
                'type' => $validated['type'],
                'entry_at' => now(),
                'item_brand' => $visitorData['item_brand'] ?? null,
                'item_color' => $visitorData['item_color'] ?? null,
                'item_serial' => $visitorData['item_serial'] ?? null,
                'visiting_person' => $validated['visiting_person'] ?? null,
                'visit_reason' => $validated['visit_reason'] ?? null,
                'work_area' => $validated['work_area'] ?? null,
                'vehicle_brand' => $validated['vehicle_brand'] ?? null,
                'vehicle_plate' => $validated['vehicle_plate'] ?? null,
                'notes' => $validated['notes'] ?? null,
                'signature' => $visitorData['signature'] ?? null,
            ]);
        }

        $count = count($validated['visitors']);
        $message = $count > 1
            ? "Se han registrado {$count} personas correctamente."
            : "Registro de acceso guardado correctamente.";

        return redirect()->route('dashboard')->with('status', $message);
    }

    public function markExit(Request $request, AccessLog $accessLog)
    {
        $validated = $request->validate([
            'signature' => 'nullable|string'
        ]);

        $accessLog->update([
            'exit_at' => now(),
            'exit_signature' => $validated['signature'] ?? null
        ]);

        return redirect()->back()->with('status', 'Salida registrada correctamente.');
    }
}
