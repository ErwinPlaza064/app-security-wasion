<?php

namespace App\Filament\Resources\PadronVehiculars;

use App\Filament\Resources\PadronVehiculars\Pages\CreatePadronVehicular;
use App\Filament\Resources\PadronVehiculars\Pages\EditPadronVehicular;
use App\Filament\Resources\PadronVehiculars\Pages\ListPadronVehiculars;
use App\Filament\Resources\PadronVehiculars\Schemas\PadronVehicularForm;
use App\Filament\Resources\PadronVehiculars\Tables\PadronVehicularsTable;
use App\Models\PadronVehicular;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class PadronVehicularResource extends Resource
{
    protected static bool $shouldRegisterNavigation = false;
    protected static ?string $model = PadronVehicular::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    public static function form(Schema $schema): Schema
    {
        return PadronVehicularForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return PadronVehicularsTable::configure($table);
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
            'index' => ListPadronVehiculars::route('/'),
            'create' => CreatePadronVehicular::route('/create'),
            'edit' => EditPadronVehicular::route('/{record}/edit'),
        ];
    }
}




