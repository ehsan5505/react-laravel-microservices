<?php

use Illuminate\Database\Seeder;

class OrderSeeder extends Seeder
{
    public function run()
    {
        factory(\App\Order::class,30)->create()->each(function(\App\Order $order){
            factory(\App\OrderItem,random_int(1,5))->create([
                'order_id'  =>  $order->id
            ]);
        });
    }
}
