<?php

namespace App\Filament\Resources;

use App\Filament\Resources\CompanyResource\Pages;
use App\Models\Company;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class CompanyResource extends Resource
{
    protected static ?string $model = Company::class;
    protected static ?string $navigationIcon = 'heroicon-o-building-office';
    protected static ?string $navigationGroup = 'Directorio';
    protected static ?string $modelLabel = 'Empresa';
    protected static ?string $pluralModelLabel = 'Empresas';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Card::make()
                    ->schema([
                        Forms\Components\TextInput::make('name')
                            ->label('Nombre Comercial')
                            ->required()
                            ->maxLength(255),
                        Forms\Components\TextInput::make('legal_name')
                            ->label('Razón Social'),
                        Forms\Components\TextInput::make('tax_id')
                            ->label('RFC / Tax ID'),
                        Forms\Components\Toggle::make('is_active')
                            ->label('Empresa Activa')
                            ->default(true),
                    ])->columns(2)
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name')
                    ->label('Nombre Comercial')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('legal_name')
                    ->label('Razón Social')
                    ->searchable(),
                Tables\Columns\TextColumn::make('tax_id')
                    ->label('ID Fiscal'),
                Tables\Columns\IconColumn::make('is_active')
                    ->label('Estatus')
                    ->boolean(),
            ])
            ->filters([
                Tables\Filters\TernaryFilter::make('is_active')
                    ->label('Activas únicamente'),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListCompanies::route('/'),
            'create' => Pages\CreateCompany::route('/create'),
            'edit' => Pages\EditCompany::route('/{record}/edit'),
        ];
    }
}
