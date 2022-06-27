<?php

namespace App\Http\Controllers\Influencer;

use App\Http\Resources\ProductResource;
use App\Product;
use Illuminate\Http\Request;

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
                return Str::contains($product,$query) || Str::contains($product,$query);
            });
        }
        
        return ProductResource::collection($products);
    }
}
