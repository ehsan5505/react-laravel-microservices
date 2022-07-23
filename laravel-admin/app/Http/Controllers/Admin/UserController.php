<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\UserCreateRequest;
use App\Http\Requests\UserUpdateRequest;
use App\Http\Resources\UserResource;
use App\Jobs\AdminAdded;
use Illuminate\Support\Facades\Hash;
use App\User;
use App\UserRole;
use App\Services\UserService;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class UserController
{
    private $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    //
    function hello()
    {
        return "Hello From the Controller";
    }

    // Return all the users
    // @users
    function index(Request $request)
    {

        // Did the Role has has access view | users (Gate(privilege, model?))
        $this->userService->allows('view', 'users');
        return $this->userService->all($request->input("page",1));
        // return response($this->userService->all($request->input("page",1)));
        // $users = User::whereIsFluencer(0)->paginate();
        // return UserResource::collection($users);
    }

    // Return Particular user
    // @users:id
    function show($id)
    {
        $this->userService->allows('view', 'users');
        // $user = \Auth::user();
        // return new UserResource(User::find($id));
        return $this->userService->find($id);
    }

    // Create new user
    // POST @users
    function store(UserCreateRequest $request)
    {
        
        
        $this->userService->allows('edit', 'users');
        
        $data = $request->only('first_name', 'last_name', 'email') + ['password'  => 'password'];
        $user = $this->userService->create($data);
        
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
        $this->userService->allows('edit', 'users');
        // $user = User::find($id);
        $data = $request->only('first_name', 'last_name', 'email');
        dd($data);

        // $user = $this->userService->update($id,$data);


        // $user->update($request->only('first_name', 'last_name', 'email'));

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
        $this->userService->allows('edit', 'users');
        UserRole::whereUserId(($id))->delete();
        User::destroy($id);
        return response(null, Response::HTTP_NO_CONTENT);
    }
}
