<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\UserCreateRequest;
use App\Http\Requests\UserUpdateRequest;
use App\Http\Resources\UserResource;
use App\Jobs\AdminAdded;
use Illuminate\Support\Facades\Hash;
use App\User;
use App\UserRole;
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
        $users = User::whereIsFluencer(0)->paginate();
        // $users = User::paginate();
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
            $request->only('first_name', 'last_name', 'email')
                + ['password'  => Hash::make(1234)] // default password, user should update
        );

        UserRole::create([
            'user_id'   => $user->id,
            'role_id'   => $request->input('role_id')
        ]);

        AdminAdded::dispatch($user->email);

        return response(new UserResource($user), Response::HTTP_CREATED);
    }

    // Update Particular user
    // PUT @users:id
    function update($id, UserUpdateRequest $request)
    {
        Gate::authorize('edit', 'users');
        $user = User::find($id);

        $user->update($request->only('first_name', 'last_name', 'email'));

        // Delete the Record of the Rule First
        UserRole::where('user_id', $user->id)->delete();
        // Add the User Role then
        UserRole::create([
            'user_id'   =>  $user->id,
            'role_id'   =>  $request->input('role_id')
        ]);

        return response(new UserResource($user), Response::HTTP_ACCEPTED);
    }

    // Delete the User
    // DELETE @users:id
    function destroy($id)
    {
        Gate::authorize('edit', 'users');
        UserRole::whereUserId(($id))->delete();
        User::destroy($id);
        return response(null, Response::HTTP_NO_CONTENT);
    }
}
