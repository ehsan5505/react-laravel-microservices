<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\UserResource;
use App\Services\UserService;

class AuthController
{

    public $userService = "";

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    // Return the User Info
    public function user(Request $request)
    {
        $this->userService->allows('view', 'users');
        $user = $this->userService->getUser();

        $resource = new UserResource($user);
        if ($user->isInfluencer()) {
            return ($resource)->additional([
                'data' => [
                    'revenue' => $user->revenue()
                ]
            ]);
        }
        dd(($resource)->additional([
            'data' => [
                'role'        => $user->role()->name,
                'permissions' => $user->permissions()
            ]
        ]));
        return ($resource)->additional([
            'data' => [
                'role'        => $user->role(),
                'permissions' => $user->permissions()
            ]
        ]);
    }
}
