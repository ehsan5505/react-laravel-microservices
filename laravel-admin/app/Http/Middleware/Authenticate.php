<?php

namespace App\Http\Middleware;
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
        // if (! $request->expectsJson()) {
        //     return route('login');
        // }
    }

    public function handle($request,Closure $next,...$guards)
    {
        // Intercept the Cookie and set it in the header as Authorization 
        if($token = $request->cookie('jwt')){
            $request->headers->set('Authorization','Bearer '.$token);
        }
        
        $this->authenticate($request,$guards);

        return $next($request);

    }




}
