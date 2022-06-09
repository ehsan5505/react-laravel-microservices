<?php

namespace App\Http\Controllers;

use App\Order;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class DashboardController extends Controller
{
    public function chart(Request $request)
    {
        \Gate::authorize('view','orders');

        $orders = Order::query()
        ->join("order_items","order_items.order_id", "=", "orders.id")
        ->selectRaw("DATE_FORMAT(orders.created_at,'%Y-%m-%d') as 'date',sum(order_items.quantity*order_item*price) as sum")
        ->groupBy('date')
        ->get();
        
        return $orders;
        // return response($orders,Response::HTTP_ACCEPTED);
    }
}
