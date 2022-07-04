<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class AdminAdded implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $email = "";

    public function __construct($email)
    {
        $this->email = $email;
        
    }

    public function handle()
    {
        \Mail::send('admin.adminAdded',[],function(Message $message){
            $message->to($this->email);
            $message->subject("[Test Microservice] | Order Confirmed");
        });
        // \Mail::send('admin.adminAdded',[], function(Message $message) {
        //     $message->to($this->email);
        //     $message->subject("Order Confirmed");
        // });
        echo $this->email;
    }
}
