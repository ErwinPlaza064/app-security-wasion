<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Auth\GoogleAuthController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', [\App\Http\Controllers\AccessLogController::class, 'dashboard'])->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Módulo de Operaciones (User Normal)
    Route::prefix('operations')->group(function () {
        // Accesos
        Route::get('/access-logs/create', [\App\Http\Controllers\AccessLogController::class, 'create'])->name('access-logs.create');
        Route::post('/access-logs', [\App\Http\Controllers\AccessLogController::class, 'store'])->name('access-logs.store');
        Route::patch('/access-logs/{accessLog}/exit', [\App\Http\Controllers\AccessLogController::class, 'markExit'])->name('access-logs.exit');

        // Vehículos
        Route::get('/vehicle-logs/create', [\App\Http\Controllers\VehicleLogController::class, 'create'])->name('vehicle-logs.create');
        Route::post('/vehicle-logs', [\App\Http\Controllers\VehicleLogController::class, 'store'])->name('vehicle-logs.store');

        // Carga y Descarga (usa el mismo controlador con parámetros)
        Route::get('/carga-descarga/create', [\App\Http\Controllers\VehicleLogController::class, 'create'])->name('carga-descarga.create');

        Route::get('/padron-vehicular/create', function () {
            return Inertia::render('Dashboard');
        })->name('padron-vehicular.create');

        // Incidencias
        Route::get('/incidents/create', [\App\Http\Controllers\IncidentController::class, 'create'])->name('incidents.create');
        Route::post('/incidents', [\App\Http\Controllers\IncidentController::class, 'store'])->name('incidents.store');

        Route::get('/dano-instalacion/create', [\App\Http\Controllers\IncidentController::class, 'create'])->name('dano-instalacion.create');
        Route::get('/incidencia-conductual/create', [\App\Http\Controllers\IncidentController::class, 'create'])->name('incidencia-conductual.create');

        // Otros / Especiales
        Route::get('/laptops/create', [\App\Http\Controllers\AccessLogController::class, 'create'])->name('laptops.create');

        Route::get('/special-logs/create', [\App\Http\Controllers\SpecialLogController::class, 'create'])->name('special-logs.create');
        Route::post('/special-logs', [\App\Http\Controllers\SpecialLogController::class, 'store'])->name('special-logs.store');

        Route::get('/colaborador-gafete/create', [\App\Http\Controllers\SpecialLogController::class, 'create'])->name('colaborador-gafete.create');
        Route::get('/renuncia-finiquito/create', [\App\Http\Controllers\SpecialLogController::class, 'create'])->name('renuncia-finiquito.create');

        // Rondines
        Route::get('/patrols/create', [\App\Http\Controllers\PatrolController::class, 'create'])->name('patrols.create');
        Route::post('/patrols', [\App\Http\Controllers\PatrolController::class, 'store'])->name('patrols.store');
    });
});

// Rutas de autenticación con Google
Route::get('/auth/google', [GoogleAuthController::class, 'redirectToGoogle'])->name('auth.google');
Route::get('/auth/google/callback', [GoogleAuthController::class, 'handleGoogleCallback'])->name('auth.google.callback');

require __DIR__ . '/auth.php';
