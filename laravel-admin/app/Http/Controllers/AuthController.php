<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\AuthRegisterRequest;
use App\Http\Resources\UserResource;
use App\Services\UserService;
use App\User;

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
        $user = $this->userService->getUser();
        // // Gate::authorize('view', 'users');
        // // return new UserResource(\Auth::user());
        $resource = new UserResource($user);
        if ($user->isInfluencer()) {
            return ($resource)->additional([
                'data' => [
                    'revenue' => $user->revenue
                ]
            ]);
        }
        return ($resource)->additional([
            'data' => [
                'role'        => $user->role,
                'permissions' => $user->permissions()
            ]
        ]);
    }
}
