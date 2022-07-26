<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ProductController
{
    public function index(Request $request)
    {

        // retain the cache for 30 mins => 60*30
        $products= \Cache::remember('products',(60*30),function() use($request){
            sleep(2);
            return Product::All();
        });
        if ($query = $request->input('s')) {
            $products = $products->filter(function(Product $product) use($query){
                return Str::contains($product->title,$query) || Str::contains($product->description,$query);
            });
        }
        
        return ProductResource::collection($products);
    }
}
