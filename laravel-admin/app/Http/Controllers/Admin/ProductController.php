<?php

namespace App\Http\Controllers\Admin;

use App\Events\ProductUpdatedEvent;
use App\Http\Requests\ProductCreateRequest;
use App\Http\Resources\ProductResource;
use App\Jobs\ProductCreated;
use App\Jobs\ProductDeleted;
use App\Jobs\ProductUpdated;
use App\Product;
use App\Services\UserService;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ProductController
{

    private $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }


    public function index()
    {
        $this->userService->allows('view', 'products');
        $products = Product::paginate();
        return ProductResource::collection($products);
    }

    public function show($id)
    {
        $this->userService->allows('view', 'products');
        return new ProductResource(Product::find($id));
    }

    public function store(ProductCreateRequest $request)
    {
        $this->userService->allows('edit', 'products');
        $product = Product::create($request->only(['title', 'description', 'imageUrl', 'price']));
        event(new ProductUpdatedEvent());

        ProductCreated::dispatch($product->toArray());

        return response(new ProductResource($product), Response::HTTP_CREATED);
    }

    public function update(Request $request, $id)
    {
        $this->userService->allows('edit', 'products');
        $product = Product::find($id);
        $product->update($request->only(['title', 'description', 'imageUrl', 'price']));
        event(new ProductUpdatedEvent());

        ProductUpdated::dispatch($product->toArray());

        return response(new ProductResource($product), Response::HTTP_ACCEPTED);
    }

    public function destroy($id)
    {
        $this->userService->allows('edit', 'products');
        Product::destroy($id);
        ProductDeleted::dispatch($id);
        return response(null, Response::HTTP_NO_CONTENT);
    }
}
