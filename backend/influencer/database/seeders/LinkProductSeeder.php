<?php

namespace Database\Seeders;

use App\Models\LinkProduct;
use Illuminate\Database\Seeder;

class LinkProductSeeder extends Seeder
{
    public function run()
    {
        $linkProducts = \DB::connection('mysql_migrate')->table('link_products')->get();

        foreach ($linkProducts as $linkProduct) {
            LinkProduct::create([
                "id"        =>  $linkProduct->id,
                "link_id"   =>  $linkProduct->link_id,
                "product_id" =>  $linkProduct->product_id
            ]);
        }
    }
}
