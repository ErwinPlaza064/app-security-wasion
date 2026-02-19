<?php

namespace App\Providers\Filament;

use Filament\Http\Middleware\Authenticate;
use Filament\Http\Middleware\AuthenticateSession;
use Filament\Http\Middleware\DisableBladeIconComponents;
use Filament\Http\Middleware\DispatchServingFilamentEvent;
use Filament\Pages;
use Filament\Panel;
use Filament\PanelProvider;
use Filament\Support\Colors\Color;
use Filament\Widgets;
use Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse;
use Illuminate\Cookie\Middleware\EncryptCookies;
use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken;
use Illuminate\Routing\Middleware\SubstituteBindings;
use Illuminate\Session\Middleware\StartSession;
use Illuminate\View\Middleware\ShareErrorsFromSession;
use Filament\Support\Facades\FilamentView;
use Illuminate\Support\Facades\Blade;

class AdminPanelProvider extends PanelProvider
{
    public function panel(Panel $panel): Panel
    {
        FilamentView::registerRenderHook(
            'panels::head.done',
            fn(): string => Blade::render('<style>
                :root {
                    --fi-background: #FFF7F2;
                }
                .fi-layout, .fi-sidebar, .fi-topbar, .fi-main, .fi-section, .fi-card {
                    background-color: #FFF7F2 !important;
                }
                /* Dark mode preservation if needed, but here we force cream for light */
                .dark {
                    --fi-background: #09090b; /* keep dynamic or user standard dark */
                }
            </style>'),
        );

        return $panel
            ->default()
            ->id('admin')
            ->path('admin')
            ->colors([
                'primary' => '#0C1869',
            ])
            ->font('Outfit')
            ->font('Outfit')
            ->brandName('Wasion Security')
            ->discoverResources(in: app_path('Filament/Resources'), for: 'App\\Filament\\Resources')
            ->discoverPages(in: app_path('Filament/Pages'), for: 'App\\Filament\\Pages')
            ->pages([
                Pages\Dashboard::class,
            ])
            ->discoverWidgets(in: app_path('Filament/Widgets'), for: 'App\\Filament\\Widgets')
            ->widgets([
                // Los widgets se cargan vía discoverWidgets
            ])
            ->middleware([
                EncryptCookies::class,
                AddQueuedCookiesToResponse::class,
                StartSession::class,
                AuthenticateSession::class,
                ShareErrorsFromSession::class,
                VerifyCsrfToken::class,
                SubstituteBindings::class,
                DisableBladeIconComponents::class,
                DispatchServingFilamentEvent::class,
            ])
            ->spa()
            ->renderHook(
                'panels::body.start',
                fn (): string => Blade::render('
                    <div x-data="{ loading: false }" 
                         x-show="loading"
                         x-on:livewire-loading.window="loading = true" 
                         x-on:livewire-load.window="loading = false"
                         x-on:livewire:navigating.window="loading = true"
                         x-on:livewire:navigated.window="loading = false"
                         class="fixed inset-0 z-50 flex items-center justify-center bg-white/50 backdrop-blur-sm"
                         style="display: none;"
                    >
                        <div class="w-full h-full p-8 animate-pulse">
                            <div class="flex flex-col space-y-4">
                                <div class="h-12 bg-gray-200 rounded-lg w-1/4"></div>
                                <div class="grid grid-cols-3 gap-4">
                                    <div class="h-32 bg-gray-200 rounded-lg col-span-2"></div>
                                    <div class="h-32 bg-gray-200 rounded-lg"></div>
                                </div>
                                <div class="h-64 bg-gray-200 rounded-lg w-full"></div>
                            </div>
                        </div>
                    </div>
                ')
            )
            ->authMiddleware([
                Authenticate::class,
            ]);
    }
}
