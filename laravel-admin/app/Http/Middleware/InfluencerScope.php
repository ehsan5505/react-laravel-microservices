<?php

namespace App\Http\Middleware;

use Closure;
use App\Services\UserService;
use Illuminate\Auth\AuthenticationException;

class InfluencerScope
{

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    public function handle($request, Closure $next)
    {

        if ($this->userService->isInfluencer()) {
            return $next($request);
        }
        throw new AuthenticationException;
    }
}
