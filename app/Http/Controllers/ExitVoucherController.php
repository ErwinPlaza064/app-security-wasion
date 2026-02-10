<?php

namespace App\Http\Controllers;

use App\Models\ExitVoucher;
use App\Models\ExitVoucherItem;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class ExitVoucherController extends Controller
{
    public function index()
    {
        $vouchers = ExitVoucher::with('user')
            ->where('plant', Auth::user()->plant)
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Operations/ExitVouchers/Index', [
            'vouchers' => $vouchers
        ]);
    }

    public function create()
    {
        // Generar un folio sugerido (Secuencial: № 0001)
        $count = ExitVoucher::whereDate('created_at', now())->count() + 1;
        $suggestedFolio = str_pad($count, 4, '0', STR_PAD_LEFT);

        // Generar número de referencia automático (Basado en fecha: REF-20240210-1055)
        $suggestedReference = "REF-" . now()->format('Ymd-Hi');

        return Inertia::render('Operations/ExitVouchers/Create', [
            'suggestedFolio' => $suggestedFolio,
            'suggestedReference' => $suggestedReference
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'folio' => 'required|unique:exit_vouchers',
            'recipient_name' => 'required|string|max:255',
            'reference_number' => 'nullable|string|max:255',
            'is_fixed_asset' => 'required|boolean',
            'voucher_date' => 'required|date',
            'concept' => 'required|string',
            'other_concept_details' => 'nullable|string|max:255',
            'exit_date' => 'required|date',
            'return_date' => 'nullable|date',
        ], [
            'recipient_name.required' => 'El nombre del solicitante es obligatorio.',
            'concept.required' => 'Debe seleccionar un motivo de salida.',
            'exit_date.required' => 'La fecha de salida es obligatoria.',
        ]);

        try {
            DB::beginTransaction();

            $voucher = ExitVoucher::create([
                'folio' => $request->folio,
                'recipient_name' => $request->recipient_name,
                'reference_number' => $request->reference_number,
                'is_fixed_asset' => $request->is_fixed_asset,
                'voucher_date' => $request->voucher_date,
                'concept' => $request->concept,
                'other_concept_details' => $request->other_concept_details,
                'exit_date' => $request->exit_date,
                'return_date' => $request->return_date,
                'user_id' => Auth::id(),
                'plant' => Auth::user()->plant,
                'status' => 'pending'
            ]);

            DB::commit();

            return redirect()->route('dashboard')->with('message', 'Vale de salida creado exitosamente.');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->withErrors(['error' => 'Ocurrió un error al crear el vale: ' . $e->getMessage()]);
        }
    }

    public function close(ExitVoucher $voucher)
    {
        // Solo permitir cerrar si no está ya completado o rechazado
        if (in_array($voucher->status, ['completed', 'rejected'])) {
            return back()->withErrors(['error' => 'Este vale ya no puede ser cerrado.']);
        }

        $voucher->update([
            'status' => 'completed',
            'actual_return_date' => now(),
            'closed_by_user_id' => Auth::id()
        ]);

        return redirect()->route('exit-vouchers.index')->with('message', 'Vale de salida cerrado correctamente.');
    }
}
