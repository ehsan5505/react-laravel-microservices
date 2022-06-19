<?php

namespace App\Http\Controllers\Influencer;

use App\Product;
use Illuminate\Http\Request;

class ProductController
{
    public function index(Request $request)
    {
        
        $data = Product::query();
        if($query = $request->s)
        {
            echo "Yes";
        }

        return $data;
    }
}
