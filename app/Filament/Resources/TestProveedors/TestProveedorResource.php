<?php

namespace App\Filament\Resources\TestProveedors;

use App\Filament\Resources\TestProveedors\Pages\CreateTestProveedor;
use App\Filament\Resources\TestProveedors\Pages\EditTestProveedor;
use App\Filament\Resources\TestProveedors\Pages\ListTestProveedors;
use App\Filament\Resources\TestProveedors\Schemas\TestProveedorForm;
use App\Filament\Resources\TestProveedors\Tables\TestProveedorsTable;
use App\Models\TestProveedor;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class TestProveedorResource extends Resource
{
    protected static bool $shouldRegisterNavigation = false;
    protected static ?string $model = TestProveedor::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    public static function form(Schema $schema): Schema
    {
        return TestProveedorForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return TestProveedorsTable::configure($table);
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
            'index' => ListTestProveedors::route('/'),
            'create' => CreateTestProveedor::route('/create'),
            'edit' => EditTestProveedor::route('/{record}/edit'),
        ];
    }
}




