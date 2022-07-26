<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Mail\Message;

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
        \Mail::send(
            'influencer.admin',
            [
                'id' => $this->orderData['id'],
                'admin_total' => $this->orderData['admin_total']
            ],
            function (Message $message) {
                $message->to($this->orderData['email']);
                $message->subject('[Test MicroService] || A new order been confirmed!');
            }
        );

        \Mail::send(
            'influencer.influencer',
            [
                'code' => $this->orderData['code'],
                'influencer_total' => $this->orderData['influencer_total']
            ],
            function (Message $message) {
                $message->to($this->orderData['influencer_email']);
                $message->subject("[Test MicroService] || Order Confirmed");
            }
        );
    }
}
