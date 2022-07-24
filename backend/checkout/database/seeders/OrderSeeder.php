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
                'first_name'=>  $order->first_name,
                'last_name' =>  $order->last_name,
                'email'     =>  $order->email,
                'user_id'   =>  $order->user_id,
                'influencer_email'=>  $order->influencer_email,
                'address'   =>  $order->address,
                'address2'  =>  $order->address2,
                'city'      =>  $order->city,
                'country'   =>  $order->country,
                'zip'       =>  $order->zip,
                'complete'  =>  $order->complete,
                'transaction_id'=>  $order->transaction_id,
                'created_at'=>  $order->created_at,
                'updated_at'=>  $order->updated_at,
            ]);
        }
    }
}
