<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $userData = $request->validated();

        // Evitar que usuarios que no sean SuperAdmin cambien su nombre o correo
        if (!$request->user()->isSuperAdmin()) {
            unset($userData['name']);
            unset($userData['email']);
        }

        $request->user()->fill($userData);

        if ($request->user()->isDirty('email')) {
            // Logic removed since email_verified_at is being dropped
        }

        $request->user()->save();

        return Redirect::route('profile.edit')->with('success', 'Perfil actualizado correctamente.');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        if (!$request->user()->isSuperAdmin()) {
            return back()->with('error', 'No tienes permisos para eliminar esta cuenta. Solo el SuperAdmin puede realizar esta acción.');
        }

        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
