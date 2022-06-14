<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\AuthRegisterRequest;
use App\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\HttpFoundation\Response;

class AuthController extends Controller
{
    // login
    public function login(Request $request)
    {
        if (Auth::attempt($request->only('email', 'password'))) {
            $user = Auth::user();
            $token = $user->createToken('admin')->accessToken;

            $cookie=cookie('jwt',$token,3600);

            return response($token)->withCookie($cookie);
        }

        return response(
            ['error' => "Could not authenticate the user"],
            Response::HTTP_UNAUTHORIZED
        );
    }

    public function logout()
    {
        $cookie = \Cookie::forget('jwt');

        return response(['message'=>'Logout successfully'])->withCookie($cookie);
    }

    public function register(AuthRegisterRequest $request)
    {
        // By Default Allocate the Subscriber Role
        $user = User::create(
            $request->only('first_name', 'last_name', 'email')
                + ["password" => Hash::make($request->input('password')),
                    "role_id" => 3 
                  ]
        );
        return response($user,Response::HTTP_ACCEPTED);
    }
}
