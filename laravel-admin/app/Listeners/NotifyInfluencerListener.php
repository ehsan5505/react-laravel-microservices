<?php

namespace App\Listeners;

use App\Events\OrderCompletedEvent;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Mail\Message;

class NotifyInfluencerListener
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  object  $event
     * @return void
     */
    public function handle(OrderCompletedEvent $event)
    {

        $order = $event->order;
        \Mail::send('influencer.influencer',['order' => $order], function(Message $message) use ($order) {
            $message->to($order->influencer_email);
            $message->subject("Order Confirmed");
        });
    }
}
