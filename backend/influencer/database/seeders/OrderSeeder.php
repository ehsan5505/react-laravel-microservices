<?php

namespace Database\Seeders;

use App\Models\Order;
use Illuminate\Database\Seeder;

class OrderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $orders = \DB::connection('mysql_migrate')->table('orders')->get();
        foreach($orders as $order)
        {
            Order::create([
                'id'        =>  $order->id,
                'code'      =>  $order->code,
                'user_id'   =>  $order->user_id,
                'created_at'=>  $order->created_at,
                'updated_at'=>  $order->updated_at,
            ]);
        }
    }
}
