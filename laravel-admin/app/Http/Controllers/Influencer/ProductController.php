<?php

namespace App\Http\Controllers\Influencer;

use App\Product;
use Illuminate\Http\Request;

class ProductController
{
    public function index(Request $request)
    {

        \Cache::remember('products',5,function(){
            
            sleep(2);
            $data = Product::query();
            if ($query = $request->input('s')) {
                $data->whereRaw("title LIKE '%${query}%'");
                $data->OrWhereRaw("description LIKE '%${query}%'");
            }
            
            return $data->get();
        });
    }
}
