<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Redis;

class UpdateRankingCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'update:rankings';

    public function handle()
    {
        $users = User::whereIsFluencer(1)->get();

        $users->each(function (User $user) {

            Redis::zadd('rankings', $user->revenue, $user->full_name);
        });
    }
}
