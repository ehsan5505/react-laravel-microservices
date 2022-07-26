<?php

namespace App\Http\Controllers;

use App\Models\Link;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redis;
use Microservice\UserService;

class StatsController
{
    private $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    public function index(Request $request)
    {

        $user = $this->userService->getUser();

        $links = Link::whereUserId($user->id)->get();
        return $links->map(function (Link $link) {
            $orders = Order::whereCode($link->code)->get();
            return [
                "code"      =>  $link->code,
                "count"     =>  $orders->count(),
                "revenue"   =>  $orders->sum(fn (Order $order) => $order->total)
            ];
        });
    }

    public function rankings()
    {
        $users = collect($this->userService->all(-1));
        $users = $users->filter(function ($user) {
            if ($user['is_fluencer'])
                return $user;
        });


        $rankings = $users->map(function ($user) {
            $orders = Order::where('user_id', $user['id'])->get();

            return [
                'name' => $user->fullName(),
                'revenue' => $orders->sum(fn (Order $order) => (int) $order->total),
            ];
        });

        return $rankings->sortByDesc('revenue')->values();


        // return \Cache::get('rankings');
        // return Redis::zrevrange('rankings', 0, -1, 'WITHSCORES');
    }
}
