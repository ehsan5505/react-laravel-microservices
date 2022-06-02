<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Fascades\Hash;
use App\User;

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
        return Hash::make($request->password);
    }
}
