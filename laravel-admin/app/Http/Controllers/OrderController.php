<?php

namespace App\Http\Controllers;

use App\Http\Resources\OrderResource;
use App\Order;
use Symfony\Component\HttpFoundation\Response;


class OrderController extends Controller
{
    public function index()
    {
        $orders=Order::paginate();
        return response(OrderResource::collection($orders),Response::HTTP_ACCEPTED);
    }

    public function show($id)
    {
        return response(new OrderResource(Order::find($id)),Response::HTTP_ACCEPTED);
    }

    public function export()
    {
        $headers = [
            "Content-Type"      =>  "text/csv",
            "Content-Disposition"=> "attachment; filename=orders.csv",
            "Pragma"            =>  "no-cache",
            "Cache-Control"     =>  "must-revalidate, post-check=0, pre-check=0",
            "Expires"           =>  "0",
        ];

        $callback = function()
        {
            $orders = Order::all();
            $handle = fopen("php://output","w");
            $file_header = ["Id","Name","Email","Product Title","Price","Quantity"];
            fputcsv($handle,$file_header);

            foreach($orders as $order)
            {
                foreach($order->orderItem as $item)
                {
                    fputcsv($handle,$order->id,$order->name,$order->email,$item->price,$item->quantity);
                }
            }

            fclose($handle);

        };

        return \Response::stream($callback, Response::HTTP_ACCEIPTED,$headers);
    }
}
