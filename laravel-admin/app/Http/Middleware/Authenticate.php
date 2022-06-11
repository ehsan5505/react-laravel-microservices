<?php

namespace App\Http\Middleware;
use Illuminate\Http\Request;
use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Closure;

class Authenticate extends Middleware
{
    /**
     * Get the path the user should be redirected to when they are not authenticated.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return string|null
     */
    protected function redirectTo($request)
    {
        if (! $request->expectsJson()) {
            return route('login');
        }
    }

    public function handle(Request $request,Closure $next,)
    {
        // Intercept the Cookie and set it in the header as Authorization 
        if($token = $request->cookie('jwt')){
            $request->headers->set('Authorization','Bearer '.$token);
        }
        
        $this->authenticate($request);

        return next($request);

    }




}
