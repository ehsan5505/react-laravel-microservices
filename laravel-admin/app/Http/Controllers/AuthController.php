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

            return response($token);
        }

        return response(
            ['error' => "Could not authenticate the user"],
            Response::HTTP_UNAUTHORIZED
        );
    }

    public function register(AuthRegisterRequest $request)
    {
        $user = User::create(
            $request->only('first_name', 'last_name', 'email')
                + [Hash::make($request->input('password'))]
        );
        return response($user,Response::HTTP_ACCEPTED);
    }
}
