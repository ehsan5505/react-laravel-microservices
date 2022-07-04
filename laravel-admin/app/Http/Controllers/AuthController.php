<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\AuthRegisterRequest;
use App\Http\Resources\UserResource;
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

            $scope = $request->input('scope');
            if ($user->isInfluencer() && $scope !== "influencer") {
                return response(["error" => "Access Denied"], Response::HTTP_FORBIDDEN);
            }
            // print_r($request);
            // dd($scope,[$scope]);
            $token=$user->createToken($scope,[$scope])->accessToken;
            // $token = $user->createToken($scope, ['*'])->accessToken;

            $cookie = cookie('jwt', $token, 3600);

            return response(['token' => $token])->withCookie($cookie);
            // return [
            //     'token' => $token,
            // ];
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
                    "role_id" => 3,
                    "is_fluencer"   => 1 // Default if client register it would be influencer from the Web Apps
                ]
        );
        return response($user, Response::HTTP_ACCEPTED);
    }


    // Return the User Info
    public function user()
    {
        $user = \Auth::user();
        // Gate::authorize('view', 'users');
        // return new UserResource(\Auth::user());
        $resource = new UserResource($user);
        if ($user->isInfluencer()) {
            return $resource;
        }
        return ($resource)->additional([
            'data' => [
                'permissions' => $user->permissions()
            ]
        ]);
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
