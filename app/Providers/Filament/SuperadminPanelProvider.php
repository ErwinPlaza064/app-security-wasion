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

class SuperadminPanelProvider extends PanelProvider
{
    public function panel(Panel $panel): Panel
    {
        FilamentView::registerRenderHook(
            'panels::head.done',
            fn(): string => Blade::render('<style>
                :root {
                    --fi-background: #fdfcf9;
                }
                .fi-layout, .fi-sidebar, .fi-topbar, .fi-main, .fi-section, .fi-card {
                    background-color: #fdfcf9 !important;
                }
                .fi-sidebar-nav-label, .fi-sidebar-item-label, .fi-sidebar-group-label {
                    color: #1e293b !important;
                }
                .fi-brand {
                    font-size: 1.25rem !important;
                    letter-spacing: -0.05em;
                }
            </style>'),
        );

        return $panel
            ->id('superadmin')
            ->path('superadmin')
            ->colors([
                'primary' => '#0C1869',
                'gray' => Color::Slate,
            ])
            ->font('Outfit')
            ->brandName('Wasion SuperAdmin')
            ->databaseNotifications()
            ->databaseNotificationsPolling('3m')
            ->discoverResources(in: app_path('Filament/Superadmin/Resources'), for: 'App\\Filament\\Superadmin\\Resources')
            ->discoverPages(in: app_path('Filament/Superadmin/Pages'), for: 'App\\Filament\\Superadmin\\Pages')
            ->pages([
                Pages\Dashboard::class,
            ])
            ->discoverWidgets(in: app_path('Filament/Superadmin/Widgets'), for: 'App\\Filament\\Superadmin\\Widgets')
            ->resources([])
            ->widgets([
                Widgets\AccountWidget::class,
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
