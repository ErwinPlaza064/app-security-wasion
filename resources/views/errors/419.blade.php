<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Sesión Expirada | 419</title>
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
        <div class="error-card bg-white rounded-2xl p-8 md:p-12 space-y-8">
            <!-- Error Icon -->
            <div class="flex justify-center">
                <div class="flex items-center justify-center w-16 h-16 rounded-full bg-orange-50 border-2 border-orange-100">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
            </div>

            <!-- Content -->
            <div class="text-center space-y-3">
                <p class="text-sm font-semibold text-orange-600 uppercase tracking-wide">Error 419</p>
                <h1 class="text-3xl font-bold text-gray-900">Sesión Expirada</h1>
                <p class="text-base text-gray-600 leading-relaxed">
                    Tu sesión ha expirado por inactividad. Por favor, vuelve a iniciar sesión para continuar.
                </p>
            </div>

            <!-- Actions -->
            <div class="flex flex-col gap-3 pt-4">
                <a href="{{ url('login') }}" class="flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200">
                    Reiniciar Sesión
                </a>
                <a href="{{ url('/') }}" class="flex items-center justify-center px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors duration-200">
                    Ir al Inicio
                </a>
            </div>
        </div>

        <!-- Footer -->
        <div class="text-center mt-8">
            <p class="text-sm text-gray-500 font-medium">Wasion Security System</p>
            <p class="text-xs text-gray-400 mt-2">Tu seguridad es importante para nosotros</p>
        </div>
    </div>
</body>
</html>
