<x-filament-widgets::widget>
    <x-filament::section>
        <div>
            <h3 style="font-size: 15px; font-weight: 600; margin-bottom: 16px; color: inherit;">
                {{ $heading }}
            </h3>

            @if(count($items) === 0)
                <p style="text-align: center; padding: 32px 0; opacity: 0.5; font-size: 13px;">Sin datos disponibles</p>
            @else
                <div style="display: flex; align-items: flex-end; gap: 6px; height: 260px; overflow-x: auto; padding-bottom: 4px;">
                    @foreach($items as $index => $item)
                        @php
                            $percentage = $maxValue > 0 ? ($item['value'] / $maxValue) * 100 : 0;
                            $color = $colors[$index % count($colors)];
                            $barHeight = max($percentage, 3);
                        @endphp
                        <div style="display: flex; flex-direction: column; align-items: center; flex: 1; min-width: 40px; height: 100%; justify-content: flex-end;">
                            {{-- Value on top --}}
                            <div style="font-size: 11px; font-weight: 700; margin-bottom: 4px; font-variant-numeric: tabular-nums; color: inherit;">
                                {{ number_format($item['value']) }}
                            </div>
                            {{-- Vertical Bar --}}
                            <div style="width: 100%; max-width: 60px; height: {{ $barHeight }}%; background-color: {{ $color }}; border-radius: 6px 6px 0 0; transition: height 0.5s ease-out; min-height: 4px;"></div>
                        </div>
                    @endforeach
                </div>
                {{-- Labels row below --}}
                <div style="display: flex; gap: 6px; margin-top: 6px;">
                    @foreach($items as $index => $item)
                        <div style="flex: 1; min-width: 40px; text-align: center; font-size: 10px; opacity: 0.85; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="{{ $item['label'] }}">
                            {{ $item['label'] }}
                        </div>
                    @endforeach
                </div>
            @endif
        </div>
    </x-filament::section>
</x-filament-widgets::widget>
