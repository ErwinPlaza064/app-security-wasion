<?php

namespace App\Filament\Resources\Contratistas;

use App\Filament\Resources\Contratistas\Pages\CreateContratista;
use App\Filament\Resources\Contratistas\Pages\EditContratista;
use App\Filament\Resources\Contratistas\Pages\ListContratistas;
use App\Filament\Resources\Contratistas\Schemas\ContratistaForm;
use App\Filament\Resources\Contratistas\Tables\ContratistasTable;
use App\Models\Contratista;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class ContratistaResource extends Resource
{
    protected static bool $shouldRegisterNavigation = false;
    protected static ?string $model = Contratista::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    public static function form(Schema $schema): Schema
    {
        return ContratistaForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return ContratistasTable::configure($table);
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
            'index' => ListContratistas::route('/'),
            'create' => CreateContratista::route('/create'),
            'edit' => EditContratista::route('/{record}/edit'),
        ];
    }
}




