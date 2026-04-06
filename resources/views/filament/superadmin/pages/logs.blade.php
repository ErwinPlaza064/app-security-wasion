<x-filament-panels::page>
    <div class="space-y-4">
        {{-- Info Card --}}
        <div class="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
            <div class="flex items-center gap-3">
                <div class="p-2 bg-primary-100 rounded-lg dark:bg-primary-900/10">
                    <x-heroicon-o-information-circle class="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                    <h3 class="text-sm font-medium text-gray-900 dark:text-gray-100 italic">Estado del Sistema</h3>
                    <p class="text-xs text-gray-500 dark:text-gray-400">Tamaño del archivo de log actual: <strong>{{ $this->getFileSize() }}</strong></p>
                </div>
            </div>
            
            <div class="flex items-center gap-2">
                <span class="text-xs text-gray-500 dark:text-gray-400">Filtrar por nivel:</span>
                <select
                    wire:model.live="filterLevel"
                    class="text-xs bg-transparent border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:border-gray-700"
                >
                    <option value="all">Todos los niveles</option>
                    <option value="error">Errores</option>
                    <option value="warning">Advertencias</option>
                    <option value="info">Información</option>
                </select>
            </div>
        </div>

        {{-- Logs Table --}}
        <x-filament::section>
            @php $logs = $this->getLogs(); @endphp
            
            @if(count($logs) > 0)
                <div class="overflow-x-auto">
                    <table class="w-full text-left divide-y divide-gray-200 dark:divide-gray-800">
                        <thead>
                            <tr class="bg-gray-50 dark:bg-gray-800/50">
                                <th class="px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider dark:text-gray-400">Nivel</th>
                                <th class="px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider dark:text-gray-400">Fecha</th>
                                <th class="px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider dark:text-gray-400">Mensaje</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-100 dark:divide-gray-800">
                            @foreach($logs as $log)
                                @php
                                    $lvl = strtoupper($log['level']);
                                    $color = match (true) {
                                        str_contains($lvl, 'ERROR'), str_contains($lvl, 'CRITICAL'), str_contains($lvl, 'ALERT'), str_contains($lvl, 'EMERGENCY') => 'danger',
                                        str_contains($lvl, 'WARNING') => 'warning',
                                        str_contains($lvl, 'INFO'), str_contains($lvl, 'NOTICE') => 'info',
                                        default => 'gray',
                                    };
                                    $badgeColor = match ($color) {
                                        'danger' => 'bg-danger-100 text-danger-800 dark:bg-danger-900/30 dark:text-danger-400',
                                        'warning' => 'bg-warning-100 text-warning-800 dark:bg-warning-900/30 dark:text-warning-400',
                                        'info' => 'bg-info-100 text-info-800 dark:bg-info-900/30 dark:text-info-400',
                                        default => 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400',
                                    };
                                @endphp
                                <tr class="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                                    <td class="px-4 py-4 whitespace-nowrap">
                                        <span class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase {{ $badgeColor }}">
                                            {{ $lvl }}
                                        </span>
                                    </td>
                                    <td class="px-4 py-4 whitespace-nowrap text-xs text-gray-500 dark:text-gray-400 font-mono">
                                        {{ $log['date'] }}
                                    </td>
                                    <td class="px-4 py-4 text-xs dark:text-gray-300 min-w-[300px]">
                                        <div class="font-mono whitespace-pre-wrap break-all leading-relaxed">
                                            {{ $log['message'] }}
                                        </div>
                                    </td>
                                </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>
                
                <div class="mt-4 p-2 text-center">
                    <p class="text-[10px] text-gray-400 dark:text-gray-500 italic">Mostrando hasta 1000 líneas más recientes del archivo de log principal.</p>
                </div>
            @else
                <div class="flex flex-col items-center justify-center p-12 space-y-4">
                    <div class="p-4 bg-gray-100 rounded-full dark:bg-gray-800">
                        <x-heroicon-o-document-magnifying-glass class="w-12 h-12 text-gray-400" />
                    </div>
                    <div class="text-center">
                        <h3 class="text-lg font-medium text-gray-900 dark:text-white">No hay logs registrados</h3>
                        <p class="text-sm text-gray-500 dark:text-gray-400">El archivo de log está vacío o no se ha creado aún.</p>
                    </div>
                </div>
            @endif
        </x-filament::section>
    </div>
</x-filament-panels::page>
