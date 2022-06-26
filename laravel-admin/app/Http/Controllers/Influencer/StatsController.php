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

        return response(['code' =>'Ehsan' ],200);
        // $user = $request->user();

        // $links = Link::where('user_id', $user->id)->get();

        // return Response($links->map(function (Link $link) {
        //     $orders = Order::where('code', $link->code)->where('complete', 1)->get();
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
