<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductResource;
use App\Product;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::paginate();
        return ProductResource::collection($products);
    }

    public function show($id)
    {
        return new ProductResource(Product::find($id));
    }

    public function store(Request $request)
    {

    }

    public function update(Request $request,$id)
    {

    }

    public function destroy($id)
    {
        Product::destroy($id);
        return response(null,Response::HTTP_NO_CONTENT);
    }
}
