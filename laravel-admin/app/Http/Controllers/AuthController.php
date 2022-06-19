<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\AuthRegisterRequest;
use App\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\HttpFoundation\Response;

class AuthController
{
    // login
    public function login(Request $request)
    {
        if (Auth::attempt($request->only('email', 'password'))) {
            $user = Auth::user();
            $token = $user->createToken('admin')->accessToken;

            $cookie = cookie('jwt', $token, 3600);

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

        return response(['message' => 'Logout successfully'])->withCookie($cookie);
    }

    public function register(AuthRegisterRequest $request)
    {
        // By Default Allocate the Subscriber Role
        $user = User::create(
            $request->only('first_name', 'last_name', 'email')
                + [
                    "password" => Hash::make($request->input('password')),
                    "role_id" => 7
                ]
        );
        return response($user, Response::HTTP_ACCEPTED);
    }


    // Return the User Info
    public function user()
    {
        // Gate::authorize('view', 'users');
        return new UserResource(\Auth::user());
    }

    public function updateInfo(UserUpdateProfileRequest $request)
    {

        // Gate::authorize('view', 'users');
        $user = \Auth::user();
        $user->update($request->only('first_name', 'last_name', 'email', 'role_id'));
        return response(new UserResource($user), Response::HTTP_ACCEPTED);
    }

    public function updatePassword(UserPasswordUpdateRequest $request)
    {
        // Gate::authorize('view', 'users');
        $user = \Auth::user();
        $user->update(['password' => Hash::make($request->input('password'))]);
        return response(new UserResource($user), Response::HTTP_ACCEPTED);
    }
}
