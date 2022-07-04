<?php

namespace App\Console\Commands;

// use App\Jobs\AdminAdded;

use App\Jobs\OrderCompleted;
use App\Order;
use Illuminate\Console\Command;

class FireEventCommand extends Command
{
    protected $signature = 'fire';

    public function handle()
    {
        // return "Pakistan";
        // AdminAdded::dispatch("john@cena.com");
        $order = Order::find(1);
        $data = $order->toArray();
        $data['influencer_total'] = $order->influencer_total;
        $data['admin_total']    =   $order->admin_total;
        OrderCompleted::dispatch($data);
    }
}
