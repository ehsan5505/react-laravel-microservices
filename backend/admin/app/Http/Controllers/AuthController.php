<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use Microservice\UserService;

class AuthController
{
    // Return the User Info
    public function user()
    {
        dd(new UserService());
        // return new UserResource((new UserService())->getUser());
    }
}
