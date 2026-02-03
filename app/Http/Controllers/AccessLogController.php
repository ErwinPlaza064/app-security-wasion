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
        $activeVisitors = AccessLog::with(['externalPerson.company'])
            ->whereNull('exit_at')
            ->orderBy('entry_at', 'desc')
            ->get();

        return Inertia::render('Dashboard', [
            'activeVisitors' => $activeVisitors
        ]);
    }

    public function create(Request $request)
    {
        $type = $request->query('type', 'visitor');
        $companies = Company::where('is_active', true)->orderBy('name')->get();

        return Inertia::render('Operations/AccessLogs/Create', [
            'type' => $type,
            'companies' => $companies,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'type' => 'required|in:visitor,supplier,contractor,laptop_only,employee_laptop',
            'visitors' => 'required|array|min:1',
            'visitors.*.full_name' => 'required|string|max:255',
            'visitors.*.id_number' => 'nullable|string|max:255',
            'company_id' => 'nullable|exists:companies,id',
            'new_company' => 'nullable|string|max:255',
            'phone' => 'nullable|string|max:20',
            'item_brand' => 'nullable|string|max:255',
            'item_color' => 'nullable|string|max:255',
            'item_serial' => 'nullable|string|max:255',
            'notes' => 'nullable|string',
            'signature' => 'nullable|string',
        ]);

        // Manejar creación de empresa si es nueva
        $companyId = $validated['company_id'];
        if (!$companyId && !empty($validated['new_company'])) {
            $company = Company::create(['name' => $validated['new_company']]);
            $companyId = $company->id;
        }

        foreach ($validated['visitors'] as $visitorData) {
            // Buscar o crear persona externa
            $externalPerson = ExternalPerson::firstOrCreate(
                ['full_name' => $visitorData['full_name'], 'company_id' => $companyId],
                ['id_number' => $visitorData['id_number'], 'phone' => $validated['phone']]
            );

            // Crear registro de acceso individual
            AccessLog::create([
                'external_person_id' => $externalPerson->id,
                'type' => $validated['type'],
                'entry_at' => now(),
                'item_brand' => $validated['item_brand'],
                'item_color' => $validated['item_color'],
                'item_serial' => $validated['item_serial'],
                'notes' => $validated['notes'],
                'signature' => $validated['signature'],
            ]);
        }

        $count = count($validated['visitors']);
        $message = $count > 1
            ? "Se han registrado {$count} personas correctamente."
            : "Registro de acceso guardado correctamente.";

        return redirect()->route('dashboard')->with('status', $message);
    }

    public function markExit(AccessLog $accessLog)
    {
        $accessLog->update([
            'exit_at' => now()
        ]);

        return redirect()->back()->with('status', 'Salida registrada correctamente.');
    }
}
