<?php

namespace App\Console\Commands;

use App\Order;
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
    
    private $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    public function handle()
    {

        $users = collect($this->userService->all(-1));
        $users = $users->filter(function($user){
            return $user->is_fluencer;
        });
        // $users = User::whereIsFluencer(1)->get();

        $users->each(function (User $user) {
            $orders = Order::where('user_id',$user->id)->where('complete',1)->get();
            $revenue = $orders->sum(function(Order $order) {
                return (int) $order->influencer_total;
            });

            Redis::zadd('rankings', $user->revenue, $user->first_name." "+$user->last_name);
        });
    }
}
