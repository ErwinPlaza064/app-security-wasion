<x-filament-widgets::widget>
    <x-filament::section>
        <div>
            <h3 class="text-base font-semibold text-gray-950 dark:text-white mb-4">
                {{ $heading }}
            </h3>

            @if(count($items) === 0)
                <p class="text-sm text-gray-500 dark:text-gray-400 text-center py-8">Sin datos disponibles</p>
            @else
                <div class="space-y-2 max-h-[320px] overflow-y-auto pr-1">
                    @foreach($items as $index => $item)
                        @php
                            $percentage = $maxValue > 0 ? ($item['value'] / $maxValue) * 100 : 0;
                            $color = $colors[$index % count($colors)];
                            $barWidth = max($percentage, 3);
                        @endphp
                        <div class="flex items-center gap-3">
                            {{-- Label --}}
                            <div class="w-[145px] min-w-[145px] text-right">
                                <span class="text-xs font-medium text-gray-600 dark:text-gray-300 leading-tight block truncate" title="{{ $item['label'] }}">
                                    {{ \Illuminate\Support\Str::limit($item['label'], 24) }}
                                </span>
                            </div>
                            {{-- Bar container --}}
                            <div class="flex-1 flex items-center gap-2 min-w-0">
                                <div class="flex-1 h-[26px] bg-gray-100 dark:bg-gray-800/60 rounded-md overflow-visible relative">
                                    <div
                                        class="h-full rounded-md flex items-center"
                                        style="width: {{ $barWidth }}%; background-color: {{ $color }};"
                                    ></div>
                                </div>
                                {{-- Value always shown outside bar --}}
                                <span class="text-xs font-bold text-gray-700 dark:text-gray-200 tabular-nums min-w-[36px] text-right">
                                    {{ number_format($item['value']) }}
                                </span>
                            </div>
                        </div>
                    @endforeach
                </div>
            @endif
        </div>
    </x-filament::section>
</x-filament-widgets::widget>
