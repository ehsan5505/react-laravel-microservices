<?php

namespace App\Http\Controllers\Admin;

use App\Http\Resources\ChartResource;
use App\Order;
use Symfony\Component\HttpFoundation\Response;
use App\Services\UserService;

class DashboardController
{
    private $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }


    public function chart()
    {
        // \Gate::authorize('view','users');

        $this->userService->allows('view', 'users');

        $orders = Order::query()
            ->join("order_items", "order_items.order_id", "=", "orders.id")
            ->selectRaw("DATE_FORMAT(orders.created_at, '%Y-%m-%d') as date,sum(quantity*price) as sum")
            ->groupBy('date')
            ->orderBy("date", "desc")
            ->get();

        return response(ChartResource::collection($orders), Response::HTTP_ACCEPTED);
        // return response($orders,Response::HTTP_ACCEPTED);
    }
}
