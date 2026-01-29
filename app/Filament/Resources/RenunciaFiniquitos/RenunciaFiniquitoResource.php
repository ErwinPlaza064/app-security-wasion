<?php

namespace App\Filament\Resources\RenunciaFiniquitos;

use App\Filament\Resources\RenunciaFiniquitos\Pages\CreateRenunciaFiniquito;
use App\Filament\Resources\RenunciaFiniquitos\Pages\EditRenunciaFiniquito;
use App\Filament\Resources\RenunciaFiniquitos\Pages\ListRenunciaFiniquitos;
use App\Filament\Resources\RenunciaFiniquitos\Schemas\RenunciaFiniquitoForm;
use App\Filament\Resources\RenunciaFiniquitos\Tables\RenunciaFiniquitosTable;
use App\Models\RenunciaFiniquito;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class RenunciaFiniquitoResource extends Resource
{
    protected static bool $shouldRegisterNavigation = false;
    protected static ?string $model = RenunciaFiniquito::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    public static function form(Schema $schema): Schema
    {
        return RenunciaFiniquitoForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return RenunciaFiniquitosTable::configure($table);
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
            'index' => ListRenunciaFiniquitos::route('/'),
            'create' => CreateRenunciaFiniquito::route('/create'),
            'edit' => EditRenunciaFiniquito::route('/{record}/edit'),
        ];
    }
}




