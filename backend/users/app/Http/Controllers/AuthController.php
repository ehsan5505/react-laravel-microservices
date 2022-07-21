<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\AuthRegisterRequest;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\HttpFoundation\Response;

class AuthController
{

    public function index(Request $request)
    {
        return response("Thank You");
    }

    // login
    public function login(Request $request)
    {
        if (Auth::attempt($request->only('email', 'password'))) {
            $user = Auth::user();
            
            $scope = $request->input('scope');
            if ($user->isInfluencer() && $scope !== "influencer") {
                return response(["error" => "Access Denied"], Response::HTTP_FORBIDDEN);
            }
            
            $token=$user->createToken($scope,[$scope])->accessToken;
            
            $cookie = cookie('jwt', $token, 3600);
            
            // return ['token' => $token];
            return response(['token' => $token])->withCookie($cookie);
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
                    // "role_id" => 3,
                    "is_fluencer"   => 1 // Default if client register it would be influencer from the Web Apps
                ]
        );
        return response($user, Response::HTTP_ACCEPTED);
    }


    // Return the User Info
    public function user()
    {
        dd("World we are learning");
        // return response("Response is getting me frustrated");
        // return \Auth::user();
    }

    public function updateInfo(UserUpdateProfileRequest $request)
    {
        // Gate::authorize('view', 'users');
        $user = \Auth::user();
        $user->update($request->only('first_name', 'last_name', 'email', 'role_id'));
        return response($user, Response::HTTP_ACCEPTED);
    }

    public function updatePassword(UserPasswordUpdateRequest $request)
    {
        // Gate::authorize('view', 'users');
        $user = \Auth::user();
        $user->update(['password' => Hash::make($request->input('password'))]);
        return response($user, Response::HTTP_ACCEPTED);
    }
}
