<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Solo creamos los accesos de gestión inicial si no existen
        if (!\App\Models\User::where('email', 'superadmin@example.com')->exists()) {
            \App\Models\User::create([
                'name' => 'Super Admin',
                'email' => 'superadmin@example.com',
                'password' => \Illuminate\Support\Facades\Hash::make('password'),
                'role' => 'SuperAdmin',
            ]);
        }

        if (!\App\Models\User::where('email', 'admin@example.com')->exists()) {
            \App\Models\User::create([
                'name' => 'Admin User',
                'email' => 'admin@example.com',
                'password' => \Illuminate\Support\Facades\Hash::make('password'),
                'role' => 'Admin',
            ]);
        }
    }
}
