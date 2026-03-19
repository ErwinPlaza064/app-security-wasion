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
        $vehicles = EmployeeVehicle::where('plant', $user->plant)
            ->with('user:id,name')
            ->orderBy('created_at', 'desc')
            ->get();

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
            'vehicle_plates' => ['required', 'string', 'max:20', 'regex:/^[A-Z]{3}-[0-9]{2,3}-[0-9A-Z]{1,2}$/'],
            'vehicle_brand_2' => 'nullable|string|max:255',
            'vehicle_model_2' => 'nullable|string|max:255',
            'vehicle_plates_2' => ['nullable', 'string', 'max:20', 'regex:/^[A-Z]{3}-[0-9]{2,3}-[0-9A-Z]{1,2}$/'],
            'documentation_status' => 'required|string',
            'validity_status' => 'required|string',
            'has_driver_license' => 'boolean',
            'driver_license_expires_at' => 'nullable|date',
            'has_circulation_card' => 'boolean',
            'has_insurance' => 'boolean',
            'insurance_expires_at' => 'nullable|date',
        ]);

        EmployeeVehicle::create([
            'marbete_number' => $validated['marbete_number'],
            'employee_name' => $validated['employee_name'],
            'area' => $validated['area'],
            'vehicle_brand' => $validated['vehicle_brand'],
            'vehicle_model' => $validated['vehicle_model'],
            'vehicle_plates' => $validated['vehicle_plates'],
            'vehicle_brand_2' => $validated['vehicle_brand_2'],
            'vehicle_model_2' => $validated['vehicle_model_2'],
            'vehicle_plates_2' => $validated['vehicle_plates_2'],
            'documentation_status' => $validated['documentation_status'],
            'validity_status' => $validated['validity_status'],
            'has_driver_license' => $request->boolean('has_driver_license'),
            'driver_license_expires_at' => $request->input('driver_license_expires_at'),
            'has_circulation_card' => $request->boolean('has_circulation_card'),
            'has_insurance' => $request->boolean('has_insurance'),
            'insurance_expires_at' => $request->input('insurance_expires_at'),
            'plant' => Auth::user()->plant,
            'user_id' => Auth::id(),
        ]);

        return redirect()->route('employee-vehicles.index')->with('status', 'Vehículo registrado en el padrón correctamente.');
    }

    public function edit(EmployeeVehicle $employeeVehicle)
    {
        $user = Auth::user();
        if ($employeeVehicle->plant !== $user->plant && $user->role !== 'superadmin') {
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
        if ($employeeVehicle->plant !== $user->plant && $user->role !== 'superadmin') {
            abort(403);
        }

        $validated = $request->validate([
            'marbete_number' => 'required|string|unique:employee_vehicles,marbete_number,' . $employeeVehicle->id,
            'employee_name' => 'required|string|max:255',
            'area' => 'required|string|max:255',
            'vehicle_brand' => 'required|string|max:255',
            'vehicle_model' => 'required|string|max:255',
            'vehicle_plates' => ['required', 'string', 'max:20', 'regex:/^[A-Z]{3}-[0-9]{2,3}-[0-9A-Z]{1,2}$/'],
            'vehicle_brand_2' => 'nullable|string|max:255',
            'vehicle_model_2' => 'nullable|string|max:255',
            'vehicle_plates_2' => ['nullable', 'string', 'max:20', 'regex:/^[A-Z]{3}-[0-9]{2,3}-[0-9A-Z]{1,2}$/'],
            'documentation_status' => 'required|string',
            'validity_status' => 'required|string',
            'has_driver_license' => 'boolean',
            'driver_license_expires_at' => 'nullable|date',
            'has_circulation_card' => 'boolean',
            'has_insurance' => 'boolean',
            'insurance_expires_at' => 'nullable|date',
        ]);

        $employeeVehicle->update($validated);

        return redirect()->route('employee-vehicles.index')->with('status', 'Vehículo actualizado correctamente.');
    }

    public function destroy(EmployeeVehicle $employeeVehicle)
    {
        $user = Auth::user();
        if ($employeeVehicle->plant !== $user->plant && $user->role !== 'superadmin') {
            abort(403);
        }

        $employeeVehicle->delete();

        return redirect()->route('employee-vehicles.index')->with('status', 'Vehículo eliminado del padrón.');
    }
}
