<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run()
    {
        $products = \DB::connection('mysql_migrate')->table('products')->get();
        foreach($products as $product)
        {
            // dump($product->id);
            Product::create([
                'id'        =>  $product->id,
                'title'     =>  $product->title,
                'description'=>  $product->description,
                'imageUrl'  =>  $product->imageUrl,
                'price'     =>  $product->price,
                'created_at'=>  $product->created_at,
                'updated_at'=>  $product->updated_at,
            ]);
        }
    }
}
