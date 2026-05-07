<x-filament-widgets::widget>
    <x-filament::section>
        <div>
            <h3 style="font-size: 15px; font-weight: 600; margin-bottom: 16px; color: inherit;">
                {{ $heading }}
            </h3>

            @if(count($items) === 0)
                <p style="text-align: center; padding: 32px 0; opacity: 0.5; font-size: 13px;">Sin datos disponibles</p>
            @else
                <div style="display: flex; flex-direction: column; gap: 8px; max-height: 320px; overflow-y: auto; padding-right: 4px;">
                    @foreach($items as $index => $item)
                        @php
                            $percentage = $maxValue > 0 ? ($item['value'] / $maxValue) * 100 : 0;
                            $color = $colors[$index % count($colors)];
                            $barWidth = max($percentage, 2);
                        @endphp
                        <div style="display: flex; align-items: center; gap: 10px;">
                            {{-- Label --}}
                            <div style="width: 150px; min-width: 150px; text-align: right; font-size: 12px; opacity: 0.85; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="{{ $item['label'] }}">
                                {{ $item['label'] }}
                            </div>
                            {{-- Bar --}}
                            <div style="flex: 1; height: 24px; background: rgba(128,128,128,0.15); border-radius: 6px; overflow: hidden; position: relative;">
                                <div style="height: 100%; width: {{ $barWidth }}%; background-color: {{ $color }}; border-radius: 6px; transition: width 0.5s ease-out; min-width: 4px;"></div>
                            </div>
                            {{-- Value --}}
                            <div style="min-width: 42px; text-align: right; font-size: 12px; font-weight: 700; font-variant-numeric: tabular-nums;">
                                {{ number_format($item['value']) }}
                            </div>
                        </div>
                    @endforeach
                </div>
            @endif
        </div>
    </x-filament::section>
</x-filament-widgets::widget>
