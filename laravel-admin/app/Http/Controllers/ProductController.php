<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductCreateRequest;
use App\Http\Resources\ProductResource;
use App\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Storage;
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

    public function store(ProductCreateRequest $request)
    {
        $product = Product::create($request->only(['title', 'description', 'imageUrl', 'price']));
        return response(new ProductResource($product), Response::HTTP_CREATED);
    }

    public function update(Request $request, $id)
    {
        $product = Product::find($id);
        $product->update($request->only(['title','desription','image','price']));
        return response(new ProductResource($product), Response::HTTP_ACCEPTED);
    }

    public function destroy($id)
    {
        Product::destroy($id);
        return response(null, Response::HTTP_NO_CONTENT);
    }
}
