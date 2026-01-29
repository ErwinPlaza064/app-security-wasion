<?php

namespace App\Filament\Resources\Visitantes;

use App\Filament\Resources\Visitantes\Pages\CreateVisitante;
use App\Filament\Resources\Visitantes\Pages\EditVisitante;
use App\Filament\Resources\Visitantes\Pages\ListVisitantes;
use App\Filament\Resources\Visitantes\Schemas\VisitanteForm;
use App\Filament\Resources\Visitantes\Tables\VisitantesTable;
use App\Models\Visitante;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class VisitanteResource extends Resource
{
    protected static bool $shouldRegisterNavigation = false;
    protected static ?string $model = Visitante::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    public static function form(Schema $schema): Schema
    {
        return VisitanteForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return VisitantesTable::configure($table);
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
            'index' => ListVisitantes::route('/'),
            'create' => CreateVisitante::route('/create'),
            'edit' => EditVisitante::route('/{record}/edit'),
        ];
    }
}




