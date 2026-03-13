<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Página No Encontrada | 404</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

        * {
            font-family: 'Inter', system-ui, -apple-system, sans-serif;
        }

        body {
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
        }

        .error-card {
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08);
        }
    </style>
</head>
<body class="flex items-center justify-center min-h-screen p-4 md:p-6">
    <div class="w-full max-w-lg">
        <!-- Error Card -->
        <div class="p-8 space-y-8 bg-white error-card rounded-2xl md:p-12">
            <!-- Error Icon -->
            <div class="flex justify-center">
                <div class="flex items-center justify-center w-16 h-16 border-2 rounded-full bg-amber-50 border-amber-100">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
            </div>

            <!-- Content -->
            <div class="space-y-3 text-center">
                <p class="text-sm font-semibold tracking-wide uppercase text-amber-600">Error 404</p>
                <h1 class="text-3xl font-bold text-gray-900">Página No Encontrada</h1>
                <p class="text-base leading-relaxed text-gray-600">
                    La página que buscas no existe o ha sido movida a otra ubicación.
                </p>
            </div>

            <!-- Actions -->
            <div class="flex flex-col gap-3 pt-4">
                <a href="{{ url('/') }}" class="flex items-center justify-center px-6 py-3 font-medium text-white transition-colors duration-200 bg-blue-600 rounded-lg hover:bg-blue-700">
                    Ir al Inicio
                </a>
                <button onclick="history.back()" class="flex items-center justify-center px-6 py-3 font-medium text-gray-700 transition-colors duration-200 bg-gray-100 rounded-lg hover:bg-gray-200">
                    ← Ir Atrás
                </button>
            </div>
        </div>

        <!-- Footer -->
        <div class="mt-8 text-center">
            <p class="text-sm font-medium text-gray-500">Wasion Security System</p>
            <p class="mt-2 text-xs text-gray-400">Si necesitas ayuda, contacta a soporte técnico</p>
        </div>
    </div>
</body>
</html>
