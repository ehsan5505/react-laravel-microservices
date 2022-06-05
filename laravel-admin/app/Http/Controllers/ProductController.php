<?php

namespace App\Http\Controllers;

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

    public function store(Request $request)
    {
        // print_r($request->input('image'));
        if(!$request->has('image'))
            return response()->json(['message'=>'Please upload the Image...']);
        
        $file = $request->file('image');
        $name =  Str::random(10); // Random String name
        $filename = $name.".".$file->extension();
        $url = Storage::putFileAs("images",$file,$filename);
        
        $filename = env('IMAGE_HOST')."/".$url; 
        return response($filename,Response::HTTP_CREATED);

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
