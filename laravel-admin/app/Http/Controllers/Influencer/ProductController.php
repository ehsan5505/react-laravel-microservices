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
        return \Cache::remember('products',(60*30),function() use($request){
            
            sleep(5);
            $data = Product::query();
            if ($query = $request->input('s')) {
                $data->whereRaw("title LIKE '%${query}%'");
                $data->OrWhereRaw("description LIKE '%${query}%'");
            }
            
            return ProductResource::collection($data->get());
        });
    }
}
