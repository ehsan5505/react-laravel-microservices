<?php

namespace App\Http\Controllers;

use App\Http\Resources\PaginateResource;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    function index(Request $request)
    {
        return response("Working");
        // return PaginateResource::collection(User::paginate($request->input('page')));
    }
}
