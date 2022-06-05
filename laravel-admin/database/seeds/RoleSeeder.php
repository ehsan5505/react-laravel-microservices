<?php

use Illuminate\Database\Seeder;

class Roles extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \App\Role::create(['name' => 'Admin']);
        \App\Role::create(['name' => 'Editor']);
        \App\Role::create(['name' => 'Subscribe']);   
    }
}
