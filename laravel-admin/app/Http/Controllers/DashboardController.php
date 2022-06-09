<?php

namespace App\Http\Controllers;

use App\Order;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class DashboardController extends Controller
{
    public function chart()
    {
        \Gate::authorize('view','orders');

        $orders = Order::query()
        ->join("order_items","order_items.order_id", "=", "orders.id")
        ->selectRaw("DATE_FORMAT(orders.created_at, '%Y-%m-%d') as date,sum(quantity*price) as sum")
        ->groupBy('date')
        ->get();
        
        return response($orders,Response::HTTP_ACCEPTED);
        // return response($orders,Response::HTTP_ACCEPTED);
    }
}
