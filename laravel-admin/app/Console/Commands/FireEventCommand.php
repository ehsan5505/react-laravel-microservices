<?php

namespace App\Console\Commands;

// use App\Jobs\AdminAdded;
use App\Product;
use App\Jobs\ProductCreated;
use Illuminate\Console\Command;

class FireEventCommand extends Command
{
    protected $signature = 'fire';

    public function handle()
    {

        $product = Product::where('id',20)->get();
        return $product;
        // ProductCreated::dispatch($product->toArray())->onQueue('checkout_queue');
        
        // return "Pakistan";
        // AdminAdded::dispatch("john@cena.com");
        // $order = Order::find(71);
        // $data = $order->toArray();
        // $data['admin_total']    =   $order->admin_total;
        // $data['influencer_total'] = $order->influencer_total;
        // OrderCompleted::dispatch($data);
    }
}
