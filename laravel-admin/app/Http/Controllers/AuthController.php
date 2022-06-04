<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;
class AuthController extends Controller
{
    // login
    public function login(Request $request)
    {
        if(Auth::attempt($request->only('email','password')))
        {
            $user = Auth::user();
            $token = $user->createToken('admin')->accessToken;

            return response($token);

        }

        return response(
            ['error' => "Could not authenticate the user"],
            Response::HTTP_UNAUTHORIZED);
    }
}
