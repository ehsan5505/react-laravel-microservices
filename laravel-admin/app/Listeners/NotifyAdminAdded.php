<?php

namespace App\Listeners;

use App\Events\AdminAddedEvent;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Mail\Message;

class NotifyAdminAdded
{
    public function handle(AdminAddedEvent $event)
    {
        $user = $event->user;
        \Mail::send('admin.adminAdded',[], function(Message $message) use ($user) {
            $message->to($user->email);
            $message->subject("Order Confirmed");
        });
    }
}
