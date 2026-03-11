<x-filament-panels::page>
    <div class="space-y-6">
        {{-- Info Card --}}
        <div class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <div class="flex items-start gap-4">
                <div class="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-50 dark:bg-primary-500/10">
                    <x-heroicon-o-circle-stack class="h-6 w-6 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                        Sistema de Respaldos
                    </h3>
                    <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Los respaldos incluyen la base de datos PostgreSQL completa y los archivos de evidencia de incidencias.
                        Se almacenan automáticamente en <strong>Cloudflare R2</strong> (nube) y localmente.
                    </p>
                </div>
            </div>
        </div>

        {{-- Backup Details --}}
        <div class="grid gap-6 md:grid-cols-2">
            {{-- What's included --}}
            <div class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                <h4 class="mb-4 flex items-center gap-2 text-base font-semibold text-gray-900 dark:text-white">
                    <x-heroicon-o-document-check class="h-5 w-5 text-success-500" />
                    ¿Qué se respalda?
                </h4>
                <ul class="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <li class="flex items-center gap-2">
                        <x-heroicon-m-check-circle class="h-4 w-4 text-success-500" />
                        Base de datos PostgreSQL completa
                    </li>
                    <li class="flex items-center gap-2">
                        <x-heroicon-m-check-circle class="h-4 w-4 text-success-500" />
                        Registros de acceso (visitantes, proveedores, contratistas)
                    </li>
                    <li class="flex items-center gap-2">
                        <x-heroicon-m-check-circle class="h-4 w-4 text-success-500" />
                        Registros de vehículos y padrón vehicular
                    </li>
                    <li class="flex items-center gap-2">
                        <x-heroicon-m-check-circle class="h-4 w-4 text-success-500" />
                        Incidencias y evidencia fotográfica
                    </li>
                    <li class="flex items-center gap-2">
                        <x-heroicon-m-check-circle class="h-4 w-4 text-success-500" />
                        Rondines, vales de salida, registros especiales
                    </li>
                    <li class="flex items-center gap-2">
                        <x-heroicon-m-check-circle class="h-4 w-4 text-success-500" />
                        Usuarios y configuración del sistema
                    </li>
                </ul>
            </div>

            {{-- Schedule info --}}
            <div class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                <h4 class="mb-4 flex items-center gap-2 text-base font-semibold text-gray-900 dark:text-white">
                    <x-heroicon-o-clock class="h-5 w-5 text-info-500" />
                    Programación
                </h4>
                <ul class="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                    <li class="flex items-start gap-3">
                        <div class="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-info-50 dark:bg-info-500/10">
                            <x-heroicon-m-arrow-path class="h-3.5 w-3.5 text-info-600 dark:text-info-400" />
                        </div>
                        <div>
                            <p class="font-medium text-gray-900 dark:text-white">Respaldo Automático</p>
                            <p>Todos los días a las 3:00 AM (automáticamente)</p>
                        </div>
                    </li>
                    <li class="flex items-start gap-3">
                        <div class="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-success-50 dark:bg-success-500/10">
                            <x-heroicon-m-cloud-arrow-up class="h-3.5 w-3.5 text-success-600 dark:text-success-400" />
                        </div>
                        <div>
                            <p class="font-medium text-gray-900 dark:text-white">Almacenamiento</p>
                            <p>Cloudflare R2 (nube) + copia local</p>
                        </div>
                    </li>
                    <li class="flex items-start gap-3">
                        <div class="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-warning-50 dark:bg-warning-500/10">
                            <x-heroicon-m-trash class="h-3.5 w-3.5 text-warning-600 dark:text-warning-400" />
                        </div>
                        <div>
                            <p class="font-medium text-gray-900 dark:text-white">Retención</p>
                            <p>7 días completos, luego diarios por 16 días, semanales por 8 semanas</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>

        {{-- Manual backup note --}}
        <div class="rounded-xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-800 dark:bg-amber-900/20">
            <div class="flex items-center gap-3">
                <x-heroicon-o-light-bulb class="h-5 w-5 text-amber-600 dark:text-amber-400" />
                <p class="text-sm text-amber-800 dark:text-amber-200">
                    <strong>Tip:</strong> Usa el botón "Crear Respaldo Ahora" en la parte superior para generar un respaldo manual inmediato. 
                    Esto es útil antes de realizar cambios importantes en el sistema.
                </p>
            </div>
        </div>
    </div>
</x-filament-panels::page>
