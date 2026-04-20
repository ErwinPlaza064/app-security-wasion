<x-filament-widgets::widget>
    <x-filament::section>
        <div>
            <h3 style="font-size: 15px; font-weight: 600; margin-bottom: 12px; color: inherit;">
                {{ $heading }}
            </h3>

            @if(count($items) === 0)
                <p style="text-align: center; padding: 32px 0; opacity: 0.5; font-size: 13px;">Sin datos disponibles</p>
            @else
                <div style="display: flex; align-items: flex-end; justify-content: center; gap: 6px; height: 220px; padding: 0 4px; overflow-x: auto;">
                    @foreach($items as $index => $item)
                        @php
                            $percentage = $maxValue > 0 ? ($item['value'] / $maxValue) * 100 : 0;
                            $barHeight = max($percentage, 4);
                            $color = $colors[$index % count($colors)];
                        @endphp
                        <div style="display: flex; flex-direction: column; align-items: center; gap: 4px; flex: 1; min-width: 40px; max-width: 56px;">
                            {{-- Value label --}}
                            <span style="font-size: 11px; font-weight: 700; opacity: 0.9;">
                                {{ number_format($item['value']) }}
                            </span>
                            {{-- Bar --}}
                            <div style="width: 100%; height: {{ $barHeight }}%; background-color: {{ $color }}; border-radius: 4px 4px 0 0; min-height: 4px; transition: height 0.5s ease-out;"></div>
                            {{-- Label --}}
                            <span style="font-size: 10px; opacity: 0.6; text-align: center; line-height: 1.2; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; width: 100;" title="{{ $item['label'] }}">
                                {{ \Illuminate\Support\Str::limit($item['label'], 8) }}
                            </span>
                        </div>
                    @endforeach
                </div>
            @endif
        </div>
    </x-filament::section>
</x-filament-widgets::widget>
