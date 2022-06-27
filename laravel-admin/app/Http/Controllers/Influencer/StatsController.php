<?php

namespace App\Http\Controllers\Influencer;

use App\Link;
use App\Order;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class StatsController
{
    public function index(Request $request)
    {

        $user = $request->user();

        $links = Link::whereUserId($user->id)->get();
        return $links->map(function (Link $link) {
            $orders = Order::whereCode($link->code)->whereComplete(1)->get();
            return [
                "code"      =>  $link->code,
                "count"     =>  $orders->count(),
                "revenue"   =>  $orders->sum(function (Order $order) {
                    return $order->influencer_total;
                })
            ];
        });
    }

    public function rankings()
    {
        $users = User::whereIsFluencer(1)->get();

        $rankings = $users->map(function(User $user){

            return [
                'user' => $user->full_name,
                'revenue'   => $user->revenue
            ];
        });

        return $rankings->SortByDesc('revenue');


    }
}
