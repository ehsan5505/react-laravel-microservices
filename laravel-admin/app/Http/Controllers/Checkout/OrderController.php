<?php

namespace App\Http\Controllers\Checkout;

use App\Link;
use App\Order;
use App\OrderItem;
use App\Product;
use Illuminate\Http\Request;

class OrderController
{
    public function store(Request $request)
    {
        $link = Link::whereCode($request->input('code'))->first();

        \DB::beginTransaction();

        $order = new Order();

        $order->first_name = $request->input('first_name');
        $order->last_name = $request->input('last_name');
        $order->email = $request->input('email');
        $order->code = $link->code;
        $order->user_id = $link->user->id;
        $order->influencer_email = $link->user->email;
        $order->address = $request->input('address');
        $order->address2 = $request->input('address2');
        $order->city = $request->input('city');
        $order->zip = $request->input('zip');
        $order->country = $request->input('country');

        $order->save();

        foreach ($request->input('items') as $item) {
            $product = Product::find($item['product_id']);

            $orderItem = new OrderItem();
            $orderItem->order_id = $order->id;
            $orderItem->title = $product->title;
            $orderItem->price = $product->price;
            $orderItem->quantity = $item['quantity'];
            $orderItem->influencer_revenue = 0.1 * $product->price*$item['quantity'];
            $orderItem->admin_revenue = 0.9 * $product->price*$item['quantity'];

            $orderItem->save();
        }

        \DB::commit();

        return $order;
    }
}
