<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Error del Servidor | 500</title>
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
            <h1 class="text-9xl font-bold opacity-10 navy-blue">500</h1>
            <div class="absolute inset-0 flex items-center justify-center">
                <div class="bg-navy-blue p-4 rounded-2xl shadow-xl">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-white" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                </div>
            </div>
        </div>

        <div class="space-y-4">
            <h2 class="text-3xl font-semibold navy-blue">Error Interno</h2>
            <p class="text-gray-600">Algo salió mal de nuestro lado. Estamos trabajando para solucionarlo. Por favor,
                intenta recargar la página en unos momentos.</p>
        </div>

        <div class="pt-6">
            <a href="{{ url('/') }}"
                class="inline-block px-8 py-3 bg-navy-blue text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl active:scale-95">
                Volver al Sistema
            </a>
        </div>

        <p class="text-xs text-gray-400 pt-12 uppercase tracking-widest">Wasion Security System</p>
    </div>
</body>

</html>
