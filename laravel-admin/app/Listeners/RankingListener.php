<?php

namespace App\Listeners;

use App\Events\OrderCompletedEvent;
use App\User;
use Illuminate\Support\Facades\Redis;

class RankingListener
{
    public function handle(OrderCompletedEvent $event)
    {
        $order = $event->order;
        $user = User::find($order->user_id);

        Redis::zincrby('rankings',$user->revenue,$user->full_name);
    }
}
