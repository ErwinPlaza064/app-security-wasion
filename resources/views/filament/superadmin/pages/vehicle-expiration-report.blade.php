<x-filament-panels::page>
    <div class="space-y-6">
        <x-filament::card>
            <div class="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-full text-blue-600">
                    <x-heroicon-o-information-circle class="w-8 h-8"/>
                </div>
                <div>
                    <h2 class="text-lg font-bold">Información del Sistema de Alertas</h2>
                    <p class="text-sm text-gray-600">
                        Este reporte analiza automáticamente todos los registros de vehículos en busca de licencias de conducir o pólizas de seguro vencidas o que vencerán en los próximos <strong>7 días</strong>.
                    </p>
                </div>
            </div>
            
            <div class="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <span class="text-xs font-black uppercase text-gray-400">Automatización</span>
                    <p class="text-sm font-semibold">El sistema envía este reporte automáticamente todos los días a las <strong>8:00 AM</strong>.</p>
                </div>
                <div class="p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <span class="text-xs font-black uppercase text-gray-400">Destinatarios</span>
                    <p class="text-sm font-semibold">Se envía a todos los usuarios con rol de <strong>Admin</strong> y <strong>SuperAdmin</strong>.</p>
                </div>
            </div>

            <div class="mt-8">
                <p class="text-[10px] text-gray-400 italic">
                    * Use el botón superior para realizar una prueba de envío manual y verificar que el análisis y los correos estén llegando correctamente.
                </p>
            </div>
        </x-filament::card>
    </div>
</x-filament-panels::page>
