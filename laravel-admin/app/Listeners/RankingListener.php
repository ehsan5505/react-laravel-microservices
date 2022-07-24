<?php

namespace App\Listeners;

use App\Events\OrderCompletedEvent;
use App\Services\UserService;
use Illuminate\Support\Facades\Redis;

class RankingListener
{
    public function handle(OrderCompletedEvent $event)
    {
        $order = $event->order;
        $revenue = $order->influencer_total;

        $userService = new UserService();
        $user = $userService->get($order->user_id);

        $user = User::find($order->user_id);

        Redis::zincrby('rankings',$revenue,$user->first_name." ".$last_name);
    }
}
