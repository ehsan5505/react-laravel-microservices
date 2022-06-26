<?php

namespace App\Listeners;

use App\Events\OrderCompletedEvent;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Mail\Message;

class NotifyAdminListener
{
    public function handle(OrderCompletedEvent $event)
    {
        $order = $event->order;

        \Mail::send('influencer.admin', ['order' => $order], function (Message $message) use ($order) {
        //     $message->from(env("MAIL_FROM_ADDRESS"));
            $message->to($order->email);
            $message->subject('A new order been confirmed!');
        });
    }
}
