<x-filament-widgets::widget>
    <x-filament::section>
        <div>
            <h3 class="text-base font-semibold text-gray-950 dark:text-white mb-4">
                {{ $heading }}
            </h3>

            @if(count($items) === 0)
                <p class="text-sm text-gray-500 dark:text-gray-400 text-center py-8">Sin datos disponibles</p>
            @else
                <div class="flex items-end justify-around gap-2" style="height: 250px;">
                    @foreach($items as $index => $item)
                        @php
                            $percentage = $maxValue > 0 ? ($item['value'] / $maxValue) * 100 : 0;
                            $color = $colors[$index % count($colors)];
                        @endphp
                        <div class="flex flex-col items-center gap-1 flex-1">
                            {{-- Value label always visible --}}
                            <span class="text-xs font-bold text-gray-700 dark:text-gray-200">
                                {{ number_format($item['value']) }}
                            </span>
                            {{-- Bar --}}
                            <div class="w-full max-w-[48px] rounded-t-md transition-all duration-500 ease-out"
                                 style="height: {{ max($percentage, 3) }}%; background-color: {{ $color }}; min-height: 4px;">
                            </div>
                            {{-- Label --}}
                            <span class="text-[10px] text-gray-500 dark:text-gray-400 text-center leading-tight mt-1 truncate w-full" title="{{ $item['label'] }}">
                                {{ \Illuminate\Support\Str::limit($item['label'], 10) }}
                            </span>
                        </div>
                    @endforeach
                </div>
            @endif
        </div>
    </x-filament::section>
</x-filament-widgets::widget>
