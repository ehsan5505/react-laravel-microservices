<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\UserResource;
use Microservice\UserService;

class AuthController
{
    // Return the User Info
    public function user()
    {
        return new UserResource((new UserService())->getUser());
    }
}
