<?php

namespace Microservice;

use Closure;
use Illuminate\Auth\AuthenticationException;

class InfluencerScope
{

    private $userService;
    
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
