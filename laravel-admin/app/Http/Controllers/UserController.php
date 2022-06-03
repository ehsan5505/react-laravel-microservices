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

    function index(){
        return User::all();
    }

    function show($id){
        return User::find($id);
    }

    function create(Request $request){
        // $user =  User::create([
        //     'first_name' => $request->first_name,
        //     'last_name'  => $request->last_name,
        //     'email'     => $request->email,
        //     'password'  => Hash::make($request->password),
        // ]);
        
        // return response($user,Response::HTTP_CREATED);
        return response(User::find(21),Response::HTTP_CREATED)
    }
}
