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
            'vehicle_plates' => 'required|string|max:20',
            'documentation_status' => 'nullable|string',
        ]);

        EmployeeVehicle::create([
            'marbete_number' => $validated['marbete_number'],
            'employee_name' => $validated['employee_name'],
            'area' => $validated['area'],
            'vehicle_brand' => $validated['vehicle_brand'],
            'vehicle_model' => $validated['vehicle_model'],
            'vehicle_plates' => $validated['vehicle_plates'],
            'documentation_status' => $validated['documentation_status'],
            'plant' => Auth::user()->plant,
            'user_id' => Auth::id(),
        ]);

        return redirect()->route('dashboard')->with('success', 'Vehículo registrado en el padrón correctamente.');
    }
}
