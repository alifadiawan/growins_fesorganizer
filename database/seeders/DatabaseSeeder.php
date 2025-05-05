<?php

namespace Database\Seeders;

use App\Models\CategoryModel;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::insert([
            'email' => 'admin@gmail.com',
            'password' => bcrypt('1234567890'),
            'name' => 'admin',
            'role' => 3 // admin
        ]);

        User::insert([
            'email' => 'alifadiawan2005@gmail.com',
            'password' => bcrypt('qwertyuiop'),
            'name' => 'Muhammad Alif Adiawan',
            'role' => 1, // user
        ]);

        CategoryModel::insert([
            ['name' => 'Web Development', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Graphic Design (Canva)', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Microsoft Excel', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Digital Marketing', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'UI/UX Design', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Content Creation', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Office & Admin Tools', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Sales & E-commerce', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Video Editing', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Freelancing & Remote Work', 'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}
