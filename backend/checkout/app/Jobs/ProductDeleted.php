<?php

namespace App\Jobs;

use App\Models\Product;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class ProductDeleted implements ShouldQueue
{

    private $id;
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct($id)
    {
        $this->id = $id;
    }

    public function handle()
    {
        Product::destroy($this->id);
    }
}
