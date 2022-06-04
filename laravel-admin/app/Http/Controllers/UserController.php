<?php

namespace App\Http\Controllers;

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
        return User::all();
    }

    // Return Particular user
    // @users:id
    function show($id){
        return User::find($id);
    }

    // Create new user
    // POST @users
    function create(Request $request){
        $user =  User::create([
            'first_name' => $request->first_name,
            'last_name'  => $request->last_name,
            'email'     => $request->email,
            'password'  => Hash::make($request->password),
        ]);
        
        return response($user,Response::HTTP_CREATED);
    }

    // Update Particular user
    // PUT @users:id
    function update($id,Request $request){
        $user = User::find($id);

        $user->update(['first_name' => $request->first_name,
        'last_name'  => $request->last_name,
        'email'     => $request->email,
        'password'  => Hash::make($request->password)]);

        return response($user, Response::HTTP_ACCEPTED);
    }

    // Delete the User
    // DELETE @users:id
    function destroy($id){
        if (User::destroy($id) == 0)
            return response("User Not Exist",Response::HTTP_NOT_FOUND);
        return response(null,Response::HTTP_NO_CONTENT);
    }


}
