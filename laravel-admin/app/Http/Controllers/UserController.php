<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;

class UserController extends Controller
{
    //
    function index(){
        return "Hello From the Controller";
    }

    function users(){
        return User::all();
    }
}
