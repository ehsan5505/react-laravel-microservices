<?php

namespace App\Listeners;

use App\Events\OrderCompletedEvent;
use App\User;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class RankingListener
{
    public function handle(OrderCompletedEvent $event)
    {
        $order = $event->order;
        $user = User::find('user_id',$order->user_id)->first();

        Redis::zincrby('rankings',$user->revenue,$user->full_name);
    }
}
