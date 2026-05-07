<x-filament-widgets::widget>
    <x-filament::section>
        <div>
            <h3 style="font-size: 15px; font-weight: 600; margin-bottom: 16px; color: inherit;">
                {{ $heading }}
            </h3>

            @if(count($items) === 0)
                <p style="text-align: center; padding: 32px 0; opacity: 0.5; font-size: 13px;">Sin datos disponibles</p>
            @else
                <div style="overflow-x: auto; padding-bottom: 8px;">
                    <div style="display: flex; align-items: flex-end; gap: 8px; height: 300px; min-width: min-content;">
                        @foreach($items as $index => $item)
                            @php
                                $percentage = $maxValue > 0 ? ($item['value'] / $maxValue) * 100 : 0;
                                $color = $colors[$index % count($colors)];
                                // Reduced base height calculation to leave room for labels
                                $barHeight = max($percentage, 2);
                            @endphp
                            <div style="display: flex; flex-direction: column; align-items: center; width: 60px; min-width: 60px; height: 100%;">
                                {{-- Value on top --}}
                                <div style="font-size: 11px; font-weight: 700; margin-bottom: 4px; font-variant-numeric: tabular-nums; color: inherit; margin-top: auto;">
                                    {{ number_format($item['value']) }}
                                </div>
                                
                                {{-- Vertical Bar Container (to handle the height percentage properly) --}}
                                <div style="width: 100%; height: 220px; display: flex; align-items: flex-end; justify-content: center;">
                                    <div style="width: 80%; height: {{ $barHeight }}%; background-color: {{ $color }}; border-radius: 6px 6px 0 0; transition: height 0.5s ease-out; min-height: 4px;"></div>
                                </div>

                                {{-- Label below --}}
                                <div style="width: 100%; margin-top: 8px; text-align: center; font-size: 10px; opacity: 0.85; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="{{ $item['label'] }}">
                                    {{ $item['label'] }}
                                </div>
                            </div>
                        @endforeach
                    </div>
                </div>
            @endif
        </div>
    </x-filament::section>
</x-filament-widgets::widget>
