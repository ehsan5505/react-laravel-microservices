<?php

namespace App\Http\Middleware;

use Closure;
use \App\Services\UserService;
use Illuminate\Auth\AuthenticationException;

class AdminScope
{

    private $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    public function handle($request, Closure $next)
    {

        if ($this->userService->isAdmin()) {
            return $next($request);
        }
        print("Something is wrong and I can feel it");
        // throw new AuthenticationException;
    }
}
