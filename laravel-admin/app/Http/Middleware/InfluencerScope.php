<?php

namespace App\Http\Middleware;

use Closure;
use App\Services\UserService;

class InfluencerScope
{

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    public function handle($request, Closure $next)
    {

        if ($this->userService->IsInfluencer()) {
            return $next($request);
        }
        throw new AuthenticationException;
    }
}
