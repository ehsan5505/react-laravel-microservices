<?php

namespace App\Listeners;

use App\Events\OrderCompletedEvent;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Mail\Message;
class NotifyAdminListener
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
        \Mail::send('influencer.admin',['order' => $order], function(Message $message) use ($order){
            $message->from(env("MAIL_FROM_ADDRESS"));
            dd($order);
            $message->to($order->email)->$message->subject('A new order been confirmed!');
        });
    }
}
