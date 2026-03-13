<x-filament-widgets::widget>
    <div class="h-full bg-cream-50 rounded-xl border border-primary/20 flex flex-col justify-center items-center py-10 shadow-sm transition hover:shadow-md hover:border-primary/40">
        <div class="flex flex-col items-center space-y-4 text-center px-4">
            <div class="p-4 bg-primary text-white rounded-full shadow-lg shadow-primary/30 transform transition hover:scale-105">
                <x-heroicon-o-chart-pie class="w-10 h-10"/>
            </div>
            <div>
                <h3 class="text-xl font-bold text-gray-900 mt-2 tracking-tight">Dashboard</h3>
                <p class="text-sm text-gray-500 font-medium mt-1">Visualiza los indicadores principales y analíticas</p>
            </div>
            <x-filament::button 
                tag="a" 
                href="{{ \App\Filament\Pages\AnalyticsDashboard::getUrl() }}" 
                size="lg" 
                color="primary"
                class="mt-4 font-bold rounded-xl"
            >
                Ir al dashboard
            </x-filament::button>
        </div>
    </div>
</x-filament-widgets::widget>

