<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Sesión Expirada | 419</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;900&display=swap');

        body {
            font-family: 'Outfit', sans-serif;
            background-color: #FDFCF9;
        }

        .navy-blue {
            color: #0A192F;
        }

        .bg-navy-blue {
            background-color: #0A192F;
        }

        @keyframes slideUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }

            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .animate-slide-up {
            animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
    </style>
</head>

<body class="flex items-center justify-center min-h-screen p-6 bg-[#FDFCF9]">
    <div class="max-w-md w-full text-center space-y-12 animate-slide-up">
        <div class="relative">
            {{-- Background 419 text --}}
            <h1 class="text-[10rem] font-black opacity-5 navy-blue leading-none select-none">419</h1>

            <div class="absolute inset-0 flex items-center justify-center">
                <div class="bg-navy-blue p-8 rounded-full shadow-2xl shadow-navy-blue/20 ring-8 ring-white">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-white" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
            </div>
        </div>

        <div
            class="bg-white p-10 md:p-12 rounded-[3.5rem] shadow-2xl shadow-gray-200/50 border border-gray-100 space-y-6">
            <h2 class="text-3xl font-black navy-blue uppercase tracking-tighter">Sesión Expirada</h2>
            <p class="text-gray-400 font-bold text-sm uppercase tracking-widest leading-relaxed">
                Tu sesión ha expirado por inactividad. Por favor, vuelve a iniciar sesión.
            </p>

            <div class="pt-6">
                <a href="{{ url('/') }}"
                    class="w-full inline-flex items-center justify-center px-10 py-6 bg-navy-blue text-white text-xs font-black uppercase tracking-[0.3em] rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-2xl active:scale-95">
                    Reiniciar Sesión
                </a>
            </div>
        </div>

        <div class="pt-8">
            <p class="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em]">Wasion Security System</p>
        </div>
    </div>
</body>

</html>
