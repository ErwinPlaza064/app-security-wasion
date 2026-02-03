<div>
    @php
        $state = $getState();
    @endphp

    @if ($state)
        <div class="mt-2 p-4 bg-gray-50 rounded-xl border border-gray-100 flex justify-center">
            <img src="{{ $state }}" alt="Firma Digital" class="max-h-48 border border-white shadow-sm rounded-lg">
        </div>
    @else
        <div
            class="mt-2 p-8 bg-gray-50 rounded-xl border border-dashed border-gray-200 text-center text-gray-400 text-sm">
            Sin firma registrada
        </div>
    @endif
</div>
