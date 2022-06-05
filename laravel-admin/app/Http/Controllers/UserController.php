<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserCreateRequest;
use App\Http\Requests\UserPasswordUpdateRequest;
use App\Http\Requests\UserUpdateRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\User;
use Symfony\Component\HttpFoundation\Response;

class UserController extends Controller
{
    //
    function hello(){
        return "Hello From the Controller";
    }

    // Return all the users
    // @users
    function index(){
        return User::paginate();
    }

    // Return Particular user
    // @users:id
    function show($id){
        return User::find($id);
    }

    // Create new user
    // POST @users
    function store(UserCreateRequest $request){
        $user =  User::create(
            $request->only('first_name','last_name','email') 
            + ['password'  => Hash::make(1234) ] // default password, user should update
        );
        
        return response($user,Response::HTTP_CREATED);
    }

    // Update Particular user
    // PUT @users:id
    function update($id,UserUpdateRequest $request){
        $user = User::find($id);

        $user->update($request->only('first_name','last_name','email'));

        return response($user, Response::HTTP_ACCEPTED);
    }

    // Delete the User
    // DELETE @users:id
    function destroy($id){
        if (User::destroy($id) == 0)
            return response("User Not Exist",Response::HTTP_NOT_FOUND);
        return response(null,Response::HTTP_NO_CONTENT);
    }


    // Return the User Info
    public function user()
    {
        return \Auth::user();
    }

    public function info(Request $request)
    {
        $user = \Auth::user();

        $user->update($request->only('first_name','last_name','email'));

        return response($user, Response::HTTP_UPDATED);

    }

    public function password(UserPasswordUpdateRequest $request)
    {
        $user = \Auth::user();

        $user->update(['password' => $request->input('password') ] );

        return response($user, Response::HTTP_UPDATED);
    }


}
