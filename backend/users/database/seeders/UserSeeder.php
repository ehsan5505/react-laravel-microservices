<?php

namespace Database\Seeders;

use App\Models\User;
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
        $users = \DB::connection("mysql_migrate")->table('users')->get();

        foreach ($users as $user) {
            User::create([
                "id" =>  $users->id,
                "first_name"    => $user->first_name,
                "last_name"     =>  $user->last_name,
                "email"         =>  $user->email,
                "password"         =>  $user->password,
                "created_at"         =>  $user->created_at,
                "updated_at"         =>  $user->updated_at,
                "is_fluencer"         =>  $user->is_fluencer
            ]);
        }
    }
}
