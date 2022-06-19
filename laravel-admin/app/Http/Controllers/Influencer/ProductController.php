<?php

namespace App\Http\Controllers\Influencer;

use App\Product;
use Illuminate\Http\Request;

class ProductController
{
    public function index()
    {
        return Product::all();
    }
}
