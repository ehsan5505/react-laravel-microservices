<?php

namespace App\Http\Controllers;

use App\Http\Resources\OrderResource;
use App\Order;
use Symfony\Component\HttpFoundation\Response;


class OrderController extends Controller
{
    public function index()
    {
        $orders=Order::paginate();
        return response(OrderResource::collection($orders),Response::HTTP_ACCEPTED);
    }

    public function show($id)
    {
        return response(new OrderResource(Order::find($id)),Response::HTTP_ACCEPTED);
    } 
}
