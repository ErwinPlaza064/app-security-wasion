<?php

namespace App\Filament\Superadmin\Pages;

use Filament\Pages\Page;
use Filament\Actions\Action;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Response;
use Filament\Notifications\Notification;
use Filament\Support\Colors\Color;

class Logs extends Page
{
    protected static ?string $navigationIcon = 'heroicon-o-clipboard-document-list';

    protected static string $view = 'filament.superadmin.pages.logs';

    protected static ?string $navigationLabel = 'Logs de Salud';

    protected static ?string $title = 'Logs de Salud del Sistema';

    protected static ?string $navigationGroup = 'Mantenimiento';

    public $filterLevel = 'all';

    public function getLogs()
    {
        $logPath = storage_path('logs/laravel.log');

        if (!File::exists($logPath)) {
            return [];
        }

        $content = File::get($logPath);
        $lines = explode("\n", $content);
        $lines = array_filter($lines);
        $lines = array_slice($lines, -1000);

        $parsedLogs = [];
        $currentLog = null;

        foreach ($lines as $line) {
            preg_match('/^\[(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})\] (\w+)\.(\w+): (.*)/', $line, $matches);

            if (count($matches) >= 5) {
                if ($currentLog) {
                    $parsedLogs[] = $currentLog;
                }

                $currentLog = [
                    'date' => $matches[1],
                    'env' => $matches[2],
                    'level' => $matches[3],
                    'message' => $matches[4]
                ];
            } else if ($currentLog) {
                $currentLog['message'] .= "\n" . $line;
            }
        }

        if ($currentLog) {
            $parsedLogs[] = $currentLog;
        }

        $parsedLogs = array_reverse($parsedLogs);

        if ($this->filterLevel !== 'all') {
            $parsedLogs = array_filter($parsedLogs, function ($log) {
                return str_contains(strtolower($log['level']), strtolower($this->filterLevel));
            });
        }

        return $parsedLogs;
    }

    public function getFileSize()
    {
        $logPath = storage_path('logs/laravel.log');
        if (!File::exists($logPath)) {
            return '0 KB';
        }
        return round(File::size($logPath) / 1024, 2) . ' KB';
    }

    protected function getHeaderActions(): array
    {
        return [
            Action::make('download')
                ->label('Descargar Log')
                ->icon('heroicon-o-arrow-down-tray')
                ->color('gray')
                ->action(fn () => $this->downloadLogs()),

            Action::make('clear')
                ->label('Limpiar Logs')
                ->icon('heroicon-o-trash')
                ->color('danger')
                ->requiresConfirmation()
                ->modalHeading('¿Estás seguro?')
                ->modalDescription('Esta acción vaciará el archivo de logs actual.')
                ->action(fn () => $this->clearLogs()),
            
            Action::make('refresh')
                ->label('Actualizar')
                ->icon('heroicon-o-arrow-path')
                ->color('primary')
                ->action(fn () => null), // Solo dispara el re-render de Livewire
        ];
    }

    public function downloadLogs()
    {
        $logPath = storage_path('logs/laravel.log');

        if (!File::exists($logPath)) {
            Notification::make()->title('Archivo no encontrado')->danger()->send();
            return null;
        }

        return Response::download($logPath, 'laravel-log-' . now()->format('Y-m-d') . '.log');
    }

    public function clearLogs()
    {
        $logPath = storage_path('logs/laravel.log');

        if (File::exists($logPath)) {
            File::put($logPath, '');
            Notification::make()
                ->title('Logs limpiados exitosamente')
                ->success()
                ->send();
        }
    }
}
