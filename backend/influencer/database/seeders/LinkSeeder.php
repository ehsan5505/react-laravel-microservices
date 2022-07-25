<?php

namespace Database\Seeders;

use App\Models\Link;
use Illuminate\Database\Seeder;

class LinkSeeder extends Seeder
{
    public function run()
    {
        $links = \DB::connection('mysql_migrate')->table('links')->get();

        dump($links);

        // foreach($links as $link)
        // {
        //     Link::create([
        //         "id"        =>  $link->id,
        //         "user_id"   =>  $link->user_id,
        //         "code"      =>  $link->code,
        //         "created_at"=>  $link->created_at,
        //         "updated_at"=>  $link->updated_at
        //     ]);
        // }

    }
}
