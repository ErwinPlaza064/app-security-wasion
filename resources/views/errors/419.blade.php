<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Sesión Expirada | 419</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600&display=swap');

        body {
            font-family: 'Outfit', sans-serif;
            background-color: #FFF7F2;
        }

        .navy-blue {
            color: #0C1869;
        }

        .bg-navy-blue {
            background-color: #0C1869;
        }
    </style>
</head>

<body class="flex items-center justify-center min-h-screen p-6">
    <div class="max-w-md w-full text-center space-y-8 animate-fade-in">
        <div class="relative">
            <h1 class="text-9xl font-bold opacity-10 navy-blue">419</h1>
            <div class="absolute inset-0 flex items-center justify-center">
                <div class="bg-navy-blue p-4 rounded-2xl shadow-xl">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-white" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
            </div>
        </div>

        <div class="space-y-4">
            <h2 class="text-3xl font-semibold navy-blue">Sesión Expirada</h2>
            <p class="text-gray-600">Tu sesión ha estado inactiva por demasiado tiempo. Por seguridad, por favor recarga
                la página e inicia sesión nuevamente.</p>
        </div>

        <div class="pt-6">
            <button onclick="window.location.reload()"
                class="inline-block px-8 py-3 bg-navy-blue text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl active:scale-95">
                Refrescar Página
            </button>
        </div>

        <p class="text-xs text-gray-400 pt-12 uppercase tracking-widest">Wasion Security System</p>
    </div>
</body>

</html>
