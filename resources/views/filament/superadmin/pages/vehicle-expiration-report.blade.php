<x-filament-panels::page>
    <div class="space-y-6">
        {{-- Info Card --}}
        <div class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <div class="flex items-start gap-4">
                <div class="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-500/10">
                    <x-heroicon-o-information-circle class="h-6 w-6 text-blue-600 dark:text-blue-400"/>
                </div>
                <div>
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                        Información del Sistema de Alertas
                    </h3>
                    <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Este reporte analiza automáticamente todos los registros de vehículos en busca de licencias de conducir o pólizas de seguro vencidas o que vencerán en los próximos <strong>7 días</strong>.
                    </p>
                </div>
            </div>

            <div class="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="p-4 bg-gray-50 dark:bg-gray-900/40 rounded-xl border border-gray-100 dark:border-gray-700">
                    <span class="text-[10px] font-black uppercase tracking-wider text-gray-400 dark:text-gray-500">Automatización</span>
                    <p class="mt-1 text-sm font-semibold text-gray-900 dark:text-gray-200">El sistema envía este reporte automáticamente todos los días a las <strong>8:00 AM</strong>.</p>
                </div>
                <div class="p-4 bg-gray-50 dark:bg-gray-900/40 rounded-xl border border-gray-100 dark:border-gray-700">
                    <span class="text-[10px] font-black uppercase tracking-wider text-gray-400 dark:text-gray-500">Destinatarios</span>
                    <p class="mt-1 text-sm font-semibold text-gray-900 dark:text-gray-200">Se envía a todos los usuarios con rol de <strong>Admin</strong> y <strong>SuperAdmin</strong>.</p>
                </div>
            </div>

            <div class="mt-8 pt-4 border-t border-gray-100 dark:border-gray-700/50">
                <p class="text-[10px] text-gray-400 dark:text-gray-500 italic">
                    * Use el botón superior para realizar una prueba de envío manual y verificar que el análisis y los correos estén llegando correctamente.
                </p>
            </div>
        </div>
    </div>
</x-filament-panels::page>
