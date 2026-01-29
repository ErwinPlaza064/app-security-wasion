<?php

namespace App\Filament\Resources\ColaboradorSinGafetes;

use App\Filament\Resources\ColaboradorSinGafetes\Pages\CreateColaboradorSinGafete;
use App\Filament\Resources\ColaboradorSinGafetes\Pages\EditColaboradorSinGafete;
use App\Filament\Resources\ColaboradorSinGafetes\Pages\ListColaboradorSinGafetes;
use App\Filament\Resources\ColaboradorSinGafetes\Schemas\ColaboradorSinGafeteForm;
use App\Filament\Resources\ColaboradorSinGafetes\Tables\ColaboradorSinGafetesTable;
use App\Models\ColaboradorSinGafete;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class ColaboradorSinGafeteResource extends Resource
{
    protected static bool $shouldRegisterNavigation = false;
    protected static ?string $model = ColaboradorSinGafete::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    public static function form(Schema $schema): Schema
    {
        return ColaboradorSinGafeteForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return ColaboradorSinGafetesTable::configure($table);
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
            'index' => ListColaboradorSinGafetes::route('/'),
            'create' => CreateColaboradorSinGafete::route('/create'),
            'edit' => EditColaboradorSinGafete::route('/{record}/edit'),
        ];
    }
}




