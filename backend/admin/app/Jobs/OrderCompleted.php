<?php

namespace App\Jobs;

use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Redis;
use Microservice\UserService;

class OrderCompleted implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $orderData;
    private $orderItemsData;
    public function __construct($orderData, $orderItemsData)
    {
        $this->orderData = $orderData;
        $this->orderItemsData = $orderItemsData;
    }

    public function handle()
    {
        $data = $this->orderData;
        unset($data['complete']);
        Order::create($data);

        foreach($this->orderItemsData as $item){
            $item['revenue'] = $item['admin_revenue'];
            unset($item['influencer_revenue']);
            unset($item['admin_revenue']);
            OrderItem::create($item);
        }
    }

}
