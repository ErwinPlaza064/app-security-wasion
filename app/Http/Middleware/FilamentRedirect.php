<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class FilamentRedirect
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        // If this is a Filament redirect, inject a script to force reload once
        if ($request->session()->has('filament_redirect')) {
            $request->session()->forget('filament_redirect');

            $content = $response->getContent();
            if (is_string($content) && str_contains($content, '<head>')) {
                // Inyectamos meta tags y un script pequeño para asegurar que no haya rastro de SPA
                $injection = '
                    <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
                    <meta http-equiv="Pragma" content="no-cache">
                    <meta http-equiv="Expires" content="0">
                    <script>
                        if (!window.location.hash.includes("reloaded")) {
                            window.location.hash = "reloaded";
                            window.location.reload();
                        }
                    </script>';
                $content = str_replace('<head>', '<head>' . $injection, $content);
                $response->setContent($content);
            }
        }

        return $response;
    }
}
