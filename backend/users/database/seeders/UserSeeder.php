<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // $users = \DB::connection("mysql_migrate")->table('users')->get();
        
        $users = \DB::connection("mysql_migrate")->getPdo();

        dump($users);
    }
}
