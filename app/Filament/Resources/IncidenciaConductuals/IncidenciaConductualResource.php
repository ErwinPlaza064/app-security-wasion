<?php

namespace App\Filament\Resources\IncidenciaConductuals;

use App\Filament\Resources\IncidenciaConductuals\Pages\CreateIncidenciaConductual;
use App\Filament\Resources\IncidenciaConductuals\Pages\EditIncidenciaConductual;
use App\Filament\Resources\IncidenciaConductuals\Pages\ListIncidenciaConductuals;
use App\Filament\Resources\IncidenciaConductuals\Schemas\IncidenciaConductualForm;
use App\Filament\Resources\IncidenciaConductuals\Tables\IncidenciaConductualsTable;
use App\Models\IncidenciaConductual;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class IncidenciaConductualResource extends Resource
{
    protected static bool $shouldRegisterNavigation = false;
    protected static ?string $model = IncidenciaConductual::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    public static function form(Schema $schema): Schema
    {
        return IncidenciaConductualForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return IncidenciaConductualsTable::configure($table);
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
            'index' => ListIncidenciaConductuals::route('/'),
            'create' => CreateIncidenciaConductual::route('/create'),
            'edit' => EditIncidenciaConductual::route('/{record}/edit'),
        ];
    }
}




