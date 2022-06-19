<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\UserCreateRequest;
use App\Http\Requests\UserPasswordUpdateRequest;
use App\Http\Requests\UserUpdateRequest;
use App\Http\Requests\UserUpdateProfileRequest;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\User;
use Gate;
use Symfony\Component\HttpFoundation\Response;

class UserController
{
    //
    function hello()
    {
        return "Hello From the Controller";
    }

    // Return all the users
    // @users
    function index()
    {
        // Did the Role has has access view | users (Gate(privilege, model?))
        Gate::authorize('view', 'users');
        $users = User::paginate();
        return UserResource::collection($users);
    }

    // Return Particular user
    // @users:id
    function show($id)
    {
        Gate::authorize('view', 'users');
        $user = \Auth::user();
        return new UserResource(User::find($id));
    }

    // Create new user
    // POST @users
    function store(UserCreateRequest $request)
    {
        Gate::authorize('edit', 'users');
        $user =  User::create(
            $request->only('first_name', 'last_name', 'email', 'role_id')
                + ['password'  => Hash::make(1234)] // default password, user should update
        );

        return response(new UserResource($user), Response::HTTP_CREATED);
    }

    // Update Particular user
    // PUT @users:id
    function update($id, UserUpdateRequest $request)
    {
        Gate::authorize('edit', 'users');
        $user = User::find($id);

        $user->update($request->only('first_name', 'last_name', 'email', 'role_id'));

        return response(new UserResource($user), Response::HTTP_ACCEPTED);
    }

    // Delete the User
    // DELETE @users:id
    function destroy($id)
    {
        Gate::authorize('edit', 'users');
        User::destroy($id);
        return response(null, Response::HTTP_NO_CONTENT);
    }

}