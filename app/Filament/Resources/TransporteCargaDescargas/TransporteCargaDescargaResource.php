<?php

namespace App\Filament\Resources\TransporteCargaDescargas;

use App\Filament\Resources\TransporteCargaDescargas\Pages\CreateTransporteCargaDescarga;
use App\Filament\Resources\TransporteCargaDescargas\Pages\EditTransporteCargaDescarga;
use App\Filament\Resources\TransporteCargaDescargas\Pages\ListTransporteCargaDescargas;
use App\Filament\Resources\TransporteCargaDescargas\Schemas\TransporteCargaDescargaForm;
use App\Filament\Resources\TransporteCargaDescargas\Tables\TransporteCargaDescargasTable;
use App\Models\TransporteCargaDescarga;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class TransporteCargaDescargaResource extends Resource
{
    protected static bool $shouldRegisterNavigation = false;
    protected static ?string $model = TransporteCargaDescarga::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    public static function form(Schema $schema): Schema
    {
        return TransporteCargaDescargaForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return TransporteCargaDescargasTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListTransporteCargaDescargas::route('/'),
            'create' => CreateTransporteCargaDescarga::route('/create'),
            'edit' => EditTransporteCargaDescarga::route('/{record}/edit'),
        ];
    }
}




