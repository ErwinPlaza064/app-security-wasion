<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Servicio No Disponible | 503</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        primary: '#0C1869',
                        cream: '#fdfcf9',
                    },
                    fontFamily: {
                        sans: ['Outfit', 'sans-serif'],
                    },
                }
            }
        }
    </script>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;900&display=swap');

        body {
            background-color: #fdfcf9;
        }

        .error-card {
            box-shadow: 0 20px 60px rgba(12, 24, 105, 0.05);
        }
    </style>
</head>
<body class="flex items-center justify-center min-h-screen p-4 md:p-6 font-sans">
    <div class="w-full max-w-lg">
        <!-- Error Card -->
        <div class="error-card bg-white rounded-3xl p-8 md:p-12 space-y-8 border border-primary/5">
            <!-- Error Icon -->
            <div class="flex justify-center">
                <div class="flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/5 border border-primary/10">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
            </div>

            <!-- Content -->
            <div class="text-center space-y-3">
                <div class="flex items-center justify-center space-x-2 mb-2">
                    <div class="w-8 h-1 bg-primary rounded-full"></div>
                    <p class="text-[10px] font-black text-primary uppercase tracking-[0.4em]">Error 503</p>
                </div>
                <h1 class="text-4xl font-black text-gray-900 tracking-tighter">Servicio no <span class="italic text-primary">Disponible</span></h1>
                <p class="text-sm font-medium text-gray-500 leading-relaxed uppercase tracking-wider pt-2">
                    El servidor está en mantenimiento. Por favor, intenta más tarde.
                </p>
            </div>

            <!-- Actions -->
            <div class="flex flex-col gap-3 pt-6 border-t border-gray-50">
                <button onclick="location.reload()" class="flex items-center justify-center px-8 py-4 bg-primary text-white text-xs font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-primary/90 transition-all duration-300 shadow-lg shadow-primary/10 active:scale-95">
                    Reintentar
                </button>
                <a href="{{ url('/') }}" class="flex items-center justify-center px-8 py-4 bg-white text-gray-400 text-xs font-black uppercase tracking-[0.2em] rounded-2xl border border-gray-100 hover:bg-gray-50 transition-all duration-300 active:scale-95">
                    Ir al Inicio
                </a>
            </div>
        </div>

        <!-- Footer -->
        <div class="text-center mt-10">
            <p class="text-[10px] font-black text-gray-300 uppercase tracking-[0.4em]">Wasion Security System</p>
            <p class="text-[9px] font-bold text-gray-400 mt-3 uppercase tracking-widest opacity-60">Disculpa las molestias - volveremos pronto</p>
        </div>
    </div>
</body>
</html>
