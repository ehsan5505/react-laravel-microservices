<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class UserRoleSeeder extends Seeder
{
    public function run()
    {
        $user_roles = \DB::connection('mysql_migrate')->table('user_roles')->get();
        dump($user_roles);
    }
}