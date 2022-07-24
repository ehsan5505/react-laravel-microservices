<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();
        $this->call(LinkProductSeeder::class);
        $this->call(LinkSeeder::class);
        $this->call(OrderItemSeeder::class);
        $this->call(OrderSeeder::class);
        $this->call(ProductSeeder::class);
    }
}
