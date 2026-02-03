<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Str;

class GoogleAuthController extends Controller
{
    /**
     * Redirige al usuario a la página de autenticación de Google
     */
    public function redirectToGoogle()
    {
        return Socialite::driver('google')->redirect();
    }

    /**
     * Maneja el callback de Google después de la autenticación
     */
    public function handleGoogleCallback()
    {
        try {
            // Obtener información del usuario de Google (Desactivando verificación SSL para dev local)
            $googleUser = Socialite::driver('google')
                ->setHttpClient(new \GuzzleHttp\Client(['verify' => false]))
                ->user();

            // Buscar o crear el usuario en la base de datos
            $user = User::where('email', $googleUser->getEmail())->first();

            if ($user) {
                // Si el usuario ya existe, actualizar su información de Google
                $user->update([
                    'google_id' => $googleUser->getId(),
                    'avatar' => $googleUser->getAvatar(),
                ]);
            } else {
                // Si el usuario no existe, crearlo
                $user = User::create([
                    'name' => $googleUser->getName(),
                    'email' => $googleUser->getEmail(),
                    'google_id' => $googleUser->getId(),
                    'avatar' => $googleUser->getAvatar(),
                    'email_verified_at' => now(), // Verificar automáticamente el email
                    'password' => bcrypt(Str::random(24)), // Contraseña aleatoria (no se usará)
                ]);
            }

            // Iniciar sesión del usuario
            Auth::login($user, true);

            // Redirigir según rol
            return redirect()->intended($user->getRedirectRoute());
        } catch (\Exception $e) {
            // Loguear el error para debug
            Log::error('Error en Google Auth: ' . $e->getMessage());

            // Si hay un error, redirigir al login con un mensaje amigable
            return redirect()->route('login')->with('error', 'No pudimos conectar con tu cuenta de Google. Por favor, intenta de nuevo.');
        }
    }
}
