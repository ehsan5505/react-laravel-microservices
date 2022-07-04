<?php

namespace App\Console\Commands;

use App\Jobs\AdminAdded;
use Illuminate\Console\Command;

class FireEventCommand extends Command
{
    protected $signature = 'fire';

    public function handle()
    {
        // return "Pakistan";
        return AdminAdded::dispatch();
    }
}
