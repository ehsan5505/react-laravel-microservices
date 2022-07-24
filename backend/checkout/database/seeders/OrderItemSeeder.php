<?php

namespace Database\Seeders;

use App\Models\OrderItem;
use Illuminate\Database\Seeder;

class OrderItemSeeder extends Seeder
{

    public function run()
    {

        $orderItems = \DB::connection('mysql_migrate')->table('order_items')->get();

        foreach ($orderItems as $orderItem) {
            OrderItem::create([
                'id'        =>  $orderItem['id'],
                'order_id'  =>  $orderItem['order_id'],
                'title'     =>  $orderItem['title'],
                'price'     =>  $orderItem['price'],
                'quantity'  =>  $orderItem['quantity'],
                'influencer_revenue' => $orderItem['influencer_revenue'],
                'admin_revenue' =>  $orderItem['admin_revenue'],
                'created_at' =>  $orderItem['created_at'],
                'updated_at' =>  $orderItem['updated_at']
            ]);
        }
    }
}
