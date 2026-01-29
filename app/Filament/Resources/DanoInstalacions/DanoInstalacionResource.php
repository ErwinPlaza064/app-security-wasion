<?php

namespace App\Filament\Resources\DanoInstalacions;

use App\Filament\Resources\DanoInstalacions\Pages\CreateDanoInstalacion;
use App\Filament\Resources\DanoInstalacions\Pages\EditDanoInstalacion;
use App\Filament\Resources\DanoInstalacions\Pages\ListDanoInstalacions;
use App\Filament\Resources\DanoInstalacions\Schemas\DanoInstalacionForm;
use App\Filament\Resources\DanoInstalacions\Tables\DanoInstalacionsTable;
use App\Models\DanoInstalacion;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class DanoInstalacionResource extends Resource
{
    protected static bool $shouldRegisterNavigation = false;
    protected static ?string $model = DanoInstalacion::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    public static function form(Schema $schema): Schema
    {
        return DanoInstalacionForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return DanoInstalacionsTable::configure($table);
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
            'index' => ListDanoInstalacions::route('/'),
            'create' => CreateDanoInstalacion::route('/create'),
            'edit' => EditDanoInstalacion::route('/{record}/edit'),
        ];
    }
}




