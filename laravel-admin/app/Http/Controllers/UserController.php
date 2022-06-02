<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
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
        return $request->first_name;
    }
}
