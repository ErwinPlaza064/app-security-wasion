<?php

namespace App\Http\Controllers\Operations;

use App\Http\Controllers\Controller;
use App\Models\EmployeeVehicle;
use App\Models\Area;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class EmployeeVehicleController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $query = EmployeeVehicle::with('user:id,name')->orderBy('created_at', 'desc');

        if (!$user->isAdmin()) {
            $query->where('plant', $user->plant);
        }

        $vehicles = $query->get();

        return Inertia::render('Operations/VehicleRegistry/Index', [
            'vehicles' => $vehicles,
        ]);
    }

    public function create()
    {
        $user = Auth::user();
        $areas = Area::where('plant', $user->plant)->orderBy('name')->get();

        return Inertia::render('Operations/VehicleRegistry/Create', [
            'areas' => $areas,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'marbete_number' => 'required|string|unique:employee_vehicles,marbete_number',
            'employee_name' => 'required|string|max:255',
            'area' => 'required|string|max:255',
            'vehicle_brand' => 'required|string|max:255',
            'vehicle_model' => 'required|string|max:255',
            'vehicle_plates' => ['required', 'string', 'max:20', 'regex:/^[A-Z0-9\s-]{3,20}$/i'],
            'vehicle_brand_2' => 'nullable|string|max:255',
            'vehicle_model_2' => 'nullable|string|max:255',
            'vehicle_plates_2' => ['nullable', 'string', 'max:20', 'regex:/^[A-Z0-9\s-]{3,20}$/i'],
            'documentation_status' => 'required|string',
            'validity_status' => 'required|string',
            'has_driver_license' => 'boolean',
            'driver_license_expires_at' => 'nullable|date',
            'has_circulation_card' => 'boolean',
            'has_insurance' => 'boolean',
            'insurance_expires_at' => 'nullable|date',
        ]);

        $hasLicense = $request->boolean('has_driver_license');
        $licenseExpires = ($hasLicense && !empty($validated['driver_license_expires_at'])) ? $validated['driver_license_expires_at'] : null;

        $hasInsurance = $request->boolean('has_insurance');
        $insuranceExpires = ($hasInsurance && !empty($validated['insurance_expires_at'])) ? $validated['insurance_expires_at'] : null;

        EmployeeVehicle::create([
            'marbete_number' => strtoupper(trim($validated['marbete_number'])),
            'employee_name' => $validated['employee_name'],
            'area' => $validated['area'],
            'vehicle_brand' => $validated['vehicle_brand'],
            'vehicle_model' => $validated['vehicle_model'],
            'vehicle_plates' => strtoupper(trim($validated['vehicle_plates'])),
            'vehicle_brand_2' => $validated['vehicle_brand_2'] ?? null,
            'vehicle_model_2' => $validated['vehicle_model_2'] ?? null,
            'vehicle_plates_2' => !empty($validated['vehicle_plates_2']) ? strtoupper(trim($validated['vehicle_plates_2'])) : null,
            'documentation_status' => $validated['documentation_status'],
            'validity_status' => $validated['validity_status'],
            'has_driver_license' => $hasLicense,
            'driver_license_expires_at' => $licenseExpires,
            'has_circulation_card' => $request->boolean('has_circulation_card'),
            'has_insurance' => $hasInsurance,
            'insurance_expires_at' => $insuranceExpires,
            'plant' => Auth::user()->plant,
            'user_id' => Auth::id(),
        ]);

        return redirect()->route('employee-vehicles.index')->with('status', 'Vehículo registrado en el padrón correctamente.');
    }

    public function edit(EmployeeVehicle $employeeVehicle)
    {
        $user = Auth::user();
        if ($employeeVehicle->plant !== $user->plant && !$user->isAdmin()) {
            abort(403);
        }

        $areas = Area::where('plant', $user->plant)->orderBy('name')->get();

        return Inertia::render('Operations/VehicleRegistry/Edit', [
            'vehicle' => $employeeVehicle,
            'areas' => $areas,
        ]);
    }

    public function update(Request $request, EmployeeVehicle $employeeVehicle)
    {
        $user = Auth::user();
        if ($employeeVehicle->plant !== $user->plant && !$user->isAdmin()) {
            abort(403);
        }

        $validated = $request->validate([
            'marbete_number' => 'required|string|unique:employee_vehicles,marbete_number,' . $employeeVehicle->id,
            'employee_name' => 'required|string|max:255',
            'area' => 'required|string|max:255',
            'vehicle_brand' => 'required|string|max:255',
            'vehicle_model' => 'required|string|max:255',
            'vehicle_plates' => ['required', 'string', 'max:20', 'regex:/^[A-Z0-9\s-]{3,20}$/i'],
            'vehicle_brand_2' => 'nullable|string|max:255',
            'vehicle_model_2' => 'nullable|string|max:255',
            'vehicle_plates_2' => ['nullable', 'string', 'max:20', 'regex:/^[A-Z0-9\s-]{3,20}$/i'],
            'documentation_status' => 'required|string',
            'validity_status' => 'required|string',
            'has_driver_license' => 'boolean',
            'driver_license_expires_at' => 'nullable|date',
            'has_circulation_card' => 'boolean',
            'has_insurance' => 'boolean',
            'insurance_expires_at' => 'nullable|date',
        ]);

        $hasLicense = $request->boolean('has_driver_license');
        $validated['has_driver_license'] = $hasLicense;
        $validated['driver_license_expires_at'] = ($hasLicense && !empty($validated['driver_license_expires_at'])) ? $validated['driver_license_expires_at'] : null;

        $validated['has_circulation_card'] = $request->boolean('has_circulation_card');

        $hasInsurance = $request->boolean('has_insurance');
        $validated['has_insurance'] = $hasInsurance;
        $validated['insurance_expires_at'] = ($hasInsurance && !empty($validated['insurance_expires_at'])) ? $validated['insurance_expires_at'] : null;

        $validated['marbete_number'] = strtoupper(trim($validated['marbete_number']));
        $validated['vehicle_plates'] = strtoupper(trim($validated['vehicle_plates']));
        $validated['vehicle_plates_2'] = !empty($validated['vehicle_plates_2']) ? strtoupper(trim($validated['vehicle_plates_2'])) : null;

        $employeeVehicle->update($validated);

        return redirect()->route('employee-vehicles.index')->with('status', 'Vehículo actualizado correctamente.');
    }

    public function destroy(EmployeeVehicle $employeeVehicle)
    {
        $user = Auth::user();
        if ($employeeVehicle->plant !== $user->plant && !$user->isAdmin()) {
            abort(403);
        }

        $employeeVehicle->delete();

        return redirect()->route('employee-vehicles.index')->with('status', 'Vehículo eliminado del padrón.');
    }
}
