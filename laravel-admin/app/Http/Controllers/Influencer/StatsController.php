<?php

namespace App\Http\Controllers\Influencer;

use App\Link;
use App\Order;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class StatsController
{
    public function index(Request $request)
    {

        $user = $request->user();

        $links = Link::where('user_id', $user->id)->get();
        $orders = Order::where('code', $link->code)->where('complete', 1)->get();
        $links->map(function(Link $link){
            dd($link);
            // return response(['code' => 'Ehsan', 'user' => $user, "link" => $link, "orders" => $orders], 200);
        });

        // return Response($links->map(function (Link $link) {
        //     return [
        //         'code' => $link->code,
        //         'count' => $orders->count(),
        //         'revenue' => $orders->sum(function (Order $order) {
        //             return $order->influencer_total;
        //         })
        //     ];
        // }), 200);
    }
}
