<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserCreateRequest;
use App\Http\Requests\UserUpdateRequest;
use App\Http\Resources\UserResource;
use App\Jobs\AdminAdded;
use App\Models\UserRole;
use Illuminate\Http\Request;
use Microservice\UserService;
use Symfony\Component\HttpFoundation\Response;

class UserController
{
    private $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    // Return all the users
    // @users
    function index(Request $request)
    {

        // Did the Role has has access view | users (Gate(privilege, model?))
        $this->userService->allows('view', 'users');
        return response($this->userService->all($request->input("page",1)));
    }

    // Return Particular user
    // @users:id
    function show($id)
    {
        $this->userService->allows('view', 'users');
        return $this->userService->find($id);
    }

    // Create new user
    // POST @users
    function store(UserCreateRequest $request)
    {
        
        
        $this->userService->allows('edit', 'users');
        
        $data = $request->only('first_name', 'last_name', 'email') + ['password'  => 'password','is_fluencer' => 0];
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
        $data = $request->only('first_name', 'last_name', 'email');        
        $user = $this->userService->update($id,$data);
        
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
        $this->userService->delete($id);
        return response(null, Response::HTTP_NO_CONTENT);
    }
}
