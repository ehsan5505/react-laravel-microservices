<?php

namespace App\Console\Commands;

use App\Order;
use App\Services\UserService;
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


        $userService = new UserService();

        $users = collect($userService->all(-1));
        $users = $users->filter(function ($user) {
            if($user['is_fluencer']){
                return $user;
            }
        });



        $users->each(function ($user) {
            print_r(`$user`);
            // $orders = Order::where('user_id', $user['id'])->where('complete', 1)->get();
            // $revenue = $orders->sum(function (Order $order) {
            //     return (int) $order->influencer_total;
            // });

            //     print `$revenue, $user->first_name." ".$user->last_name`;

            //     // Redis::zadd('rankings', $user->revenue, $user->first_name." ".$user->last_name);
        });
    }
}
