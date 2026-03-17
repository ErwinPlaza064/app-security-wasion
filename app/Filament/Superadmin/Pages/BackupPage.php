<?php

namespace App\Filament\Superadmin\Pages;

use Filament\Pages\Page;
use Filament\Actions\Action;
use Filament\Notifications\Notification;
use Illuminate\Support\Facades\Artisan;
use Filament\Forms\Components\FileUpload;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;
use Symfony\Component\Process\Process;

class BackupPage extends Page
{
    protected static ?string $navigationIcon = 'heroicon-o-circle-stack';
    protected static ?string $navigationLabel = 'Respaldos';
    protected static ?string $title = 'Respaldo de Base de Datos';
    protected static ?string $slug = 'backup';
    protected static ?int $navigationSort = 99;

    protected static string $view = 'filament.superadmin.pages.backup-page';

    protected function getHeaderActions(): array
    {
        return [
            Action::make('createBackup')
                ->label('Crear Respaldo Ahora')
                ->icon('heroicon-o-arrow-down-tray')
                ->color('success')
                ->requiresConfirmation()
                ->modalHeading('Confirmar Respaldo')
                ->modalDescription('¿Estás seguro de que deseas iniciar un nuevo respaldo completo de la base de datos y archivos? Este proceso puede tardar unos segundos. El archivo se guardará automáticamente en Cloudflare R2.')
                ->modalSubmitActionLabel('Comenzar Respaldo')
                ->action(function () {
                    try {
                        // Forzar límite de tiempo y memoria para procesos pesados
                        set_time_limit(300);
                        
                        $exitCode = Artisan::call('backup:run', ['--disable-notifications' => true]);
                        $output = Artisan::output();

                        if ($exitCode !== 0) {
                            throw new \Exception("El comando falló con código {$exitCode}. Salida: " . substr($output, 0, 200));
                        }

                        Notification::make()
                            ->title('¡Respaldo completado!')
                            ->success()
                            ->send();
                    } catch (\Exception $e) {
                        Notification::make()
                            ->title('Error técnico en el respaldo')
                            ->body($e->getMessage())
                            ->danger()
                            ->duration(15000)
                            ->send();
                    }
                }),

            Action::make('restoreBackup')
                ->label('Restaurar Respaldo (ZIP)')
                ->icon('heroicon-o-arrow-up-tray')
                ->color('danger')
                ->requiresConfirmation()
                ->modalHeading('Restaurar Sistema desde Respaldo')
                ->modalDescription('ADVERTENCIA: Esta acción reemplazará toda tu base de datos actual y los archivos de evidencia con los del archivo ZIP. Se perderá cualquier dato nuevo que no esté en este respaldo. El proceso puede tomar unos segundos, por favor no recargues la página.')
                ->modalSubmitActionLabel('Sobreescribir y Restaurar')
                ->form([
                    FileUpload::make('backup_zip')
                        ->label('Archivo .zip de Respaldo')
                        ->acceptedFileTypes(['application/zip', 'application/x-zip-compressed'])
                        ->required()
                        ->maxSize(102400) // 100MB
                        ->storeFiles(true)
                        ->disk('local')
                        ->directory('temp-restores'),
                ])
                ->action(function (array $data) {
                    $zipPath = Storage::disk('local')->path($data['backup_zip']);
                    $extractTo = storage_path('app/temp-restores/extracted_' . uniqid());
                    
                    try {
                        // 1. Extraer ZIP
                        $zip = new \ZipArchive();
                        if ($zip->open($zipPath) === true) {
                            $zip->extractTo($extractTo);
                            $zip->close();
                        } else {
                            throw new \Exception('No se pudo abrir o leer el archivo ZIP de respaldo.');
                        }

                        // 2. Restaurar Base de Datos
                        $dumpFiles = glob($extractTo . '/db-dumps/*.sql');
                        if (!empty($dumpFiles)) {
                            $sqlFile = $dumpFiles[0];
                            
                            $host = config('database.connections.pgsql.host', '127.0.0.1');
                            $port = config('database.connections.pgsql.port', '5432');
                            $database = config('database.connections.pgsql.database');
                            $username = config('database.connections.pgsql.username');
                            // 2. Preparar el comando base
                            $isWindows = DIRECTORY_SEPARATOR === '\\';
                            $psqlBinary = $isWindows ? 'psql.exe' : 'psql';
                            
                            $dumpPath = config('database.connections.pgsql.dump.dump_binary_path');
                            $psqlPath = !empty($dumpPath) 
                                            ? '"' . rtrim($dumpPath, DIRECTORY_SEPARATOR) . DIRECTORY_SEPARATOR . $psqlBinary . '"'
                                            : $psqlBinary;

                            $host = config('database.connections.pgsql.host', '127.0.0.1');
                            $port = config('database.connections.pgsql.port', '5432');
                            $database = config('database.connections.pgsql.database');
                            $username = config('database.connections.pgsql.username');
                            $password = config('database.connections.pgsql.password');

                            // Configurar variable de entorno para la contraseña (Evita pedirla interactivo)
                            putenv("PGPASSWORD=$password");

                            // 2.1 LIMPIEZA DE FUERZA BRUTA (Wipe DB)
                            $dropCmd = "{$psqlPath} -h {$host} -p {$port} -U {$username} -d {$database} -c \"DROP SCHEMA public CASCADE; CREATE SCHEMA public;\" 2>&1";
                            exec($dropCmd, $outputDrop, $returnDrop);

                            if ($returnDrop !== 0) {
                                throw new \Exception('Error limpiando BD: ' . implode("\n", $outputDrop));
                            }

                            // 2.2 RESTAURACIÓN DEL SQL
                            $sqlFileEscaped = $isWindows ? '"' . $sqlFile . '"' : $sqlFile;
                            $restoreCmd = "{$psqlPath} -h {$host} -p {$port} -U {$username} -d {$database} -f {$sqlFileEscaped} 2>&1";
                            exec($restoreCmd, $outputRestore, $returnRestore);

                            if ($returnRestore !== 0) {
                                throw new \Exception('Error de Restauración: ' . implode("\n", array_slice($outputRestore, 0, 10)));
                            }
                        }

                        // 3. Restaurar Archivos de la carpeta public
                        $appStorageSource = $extractTo . '/storage/app/public';
                        if (File::exists($appStorageSource)) {
                            File::copyDirectory($appStorageSource, storage_path('app/public'));
                        }
                        
                        // 4. Limpieza del ZIP y los extraídos
                        File::deleteDirectory($extractTo);
                        Storage::disk('local')->delete($data['backup_zip']);

                        Notification::make()
                            ->title('Restauración completada')
                            ->body('El sistema y la base de datos se han restaurado exitosamente.')
                            ->success()
                            ->duration(10000)
                            ->send();
                            
                        return redirect(request()->header('Referer'));
                        
                    } catch (\Exception $e) {
                         if (File::exists($extractTo)) {
                             File::deleteDirectory($extractTo);
                         }
                         if (Storage::disk('local')->exists($data['backup_zip'])) {
                             Storage::disk('local')->delete($data['backup_zip']);
                         }
                             
                        Notification::make()
                            ->title('Error en la restauración')
                            ->body($e->getMessage())
                            ->danger()
                            ->duration(10000)
                            ->send();
                    }
                }),
        ];
    }
}
