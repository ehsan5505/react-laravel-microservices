<?php

namespace App\Http\Controllers\Influencer;

use App\Link;
use App\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Request as FacadesRequest;
use Illuminate\Support\Facades\Response as FacadesResponse;
use Response;

class StatsController
{
    public function index(FacadesRequest $request)
    {
        $user = $request->user();

        $links = Link::where('user_id', $user->id)->get();

        return Response($links->map(function (Link $link) {
            $orders = Order::where('code', $link->code)->where('complete', 1)->get();
            return [
                'code' => $link->code,
                'count' => $orders->count(),
                'revenue' => $orders->sum(function (Order $order) {
                    return $order->influencer_total;
                })
            ];
        }), 200);
    }
}
