<x-filament-panels::page>
    <div class="space-y-6">
        <x-filament::card class="dark:bg-gray-800">
            <div class="flex items-center gap-4">
                <div class="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-600 dark:text-blue-400">
                    <x-heroicon-o-information-circle class="w-8 h-8"/>
                </div>
                <div>
                    <h2 class="text-lg font-bold dark:text-white">Información del Sistema de Alertas</h2>
                    <p class="text-sm text-gray-600 dark:text-gray-400">
                        Este reporte analiza automáticamente todos los registros de vehículos en busca de licencias de conducir o pólizas de seguro vencidas o que vencerán en los próximos <strong>7 días</strong>.
                    </p>
                </div>
            </div>
            
            <div class="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-100 dark:border-gray-700">
                    <span class="text-xs font-black uppercase text-gray-400 dark:text-gray-500">Automatización</span>
                    <p class="text-sm font-semibold dark:text-gray-200">El sistema envía este reporte automáticamente todos los días a las <strong>8:00 AM</strong>.</p>
                </div>
                <div class="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-100 dark:border-gray-700">
                    <span class="text-xs font-black uppercase text-gray-400 dark:text-gray-500">Destinatarios</span>
                    <p class="text-sm font-semibold dark:text-gray-200">Se envía a todos los usuarios con rol de <strong>Admin</strong> y <strong>SuperAdmin</strong>.</p>
                </div>
            </div>

            <div class="mt-8">
                <p class="text-[10px] text-gray-400 dark:text-gray-500 italic">
                    * Use el botón superior para realizar una prueba de envío manual y verificar que el análisis y los correos estén llegando correctamente.
                </p>
            </div>
        </x-filament::card>
    </div>
</x-filament-panels::page>
