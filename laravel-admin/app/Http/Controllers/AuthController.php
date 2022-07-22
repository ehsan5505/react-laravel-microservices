<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\AuthRegisterRequest;
use App\Http\Resources\UserResource;
use App\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\HttpFoundation\Response;
use Services\UserService;

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

        dd($this->userService->getUser());

        // $headers = [
        //     'Authorization' => $request->headers->get("Authorization")
        // ];

        // $response = \Http::withHeaders($headers)->get("http://192.168.22.138:8001/api/user");

        // return $response->json();

        // $user = \Auth::user();
        // dd($user);
        // // Gate::authorize('view', 'users');
        // // return new UserResource(\Auth::user());
        // $resource = new UserResource($user);
        // if ($user->isInfluencer()) {
        //     return $resource;
        // }
        // return ($resource)->additional([
        //     'data' => [
        //         'permissions' => $user->permissions()
        //     ]
        // ]);
    }
}
