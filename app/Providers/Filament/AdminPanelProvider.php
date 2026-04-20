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

        FilamentView::registerRenderHook(
            'panels::body.end',
            fn(): string => Blade::render('<audio id="noti-sound" src="/sounds/notification.mp3" preload="auto"></audio>
                <script>
                    document.addEventListener(\'filament-notifications.received\', () => {
                        const audio = document.getElementById(\'noti-sound\');
                        if (audio) {
                             audio.volume = 0.5;
                             audio.play().catch(e => console.log(\'Audio error:\', e));
                        }
                    });
                </script>'),
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
            ->databaseNotifications()
            ->databaseNotificationsPolling('3m')
            ->discoverResources(in: app_path('Filament/Resources'), for: 'App\\Filament\\Resources')
            ->discoverPages(in: app_path('Filament/Pages'), for: 'App\\Filament\\Pages')
            ->pages([
                \App\Filament\Pages\Dashboard::class,
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
            ->authMiddleware([
                Authenticate::class,
            ]);
    }
}
