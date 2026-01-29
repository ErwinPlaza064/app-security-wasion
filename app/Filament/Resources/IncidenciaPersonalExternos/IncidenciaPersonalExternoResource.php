<?php

namespace App\Filament\Resources\IncidenciaPersonalExternos;

use App\Filament\Resources\IncidenciaPersonalExternos\Pages\CreateIncidenciaPersonalExterno;
use App\Filament\Resources\IncidenciaPersonalExternos\Pages\EditIncidenciaPersonalExterno;
use App\Filament\Resources\IncidenciaPersonalExternos\Pages\ListIncidenciaPersonalExternos;
use App\Filament\Resources\IncidenciaPersonalExternos\Schemas\IncidenciaPersonalExternoForm;
use App\Filament\Resources\IncidenciaPersonalExternos\Tables\IncidenciaPersonalExternosTable;
use App\Models\IncidenciaPersonalExterno;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class IncidenciaPersonalExternoResource extends Resource
{
    protected static bool $shouldRegisterNavigation = false;
    protected static ?string $model = IncidenciaPersonalExterno::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    public static function form(Schema $schema): Schema
    {
        return IncidenciaPersonalExternoForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return IncidenciaPersonalExternosTable::configure($table);
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
            'index' => ListIncidenciaPersonalExternos::route('/'),
            'create' => CreateIncidenciaPersonalExterno::route('/create'),
            'edit' => EditIncidenciaPersonalExterno::route('/{record}/edit'),
        ];
    }
}




