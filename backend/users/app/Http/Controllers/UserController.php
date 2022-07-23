<?php

namespace App\Http\Controllers;

use App\Http\Resources\PaginateResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\HttpFoundation\Response;


class UserController extends Controller
{
    function index()
    {
        return PaginateResource::collection(User::paginate());
    }

    function show($id)
    {
        return response(User::find($id),Response::HTTP_ACCEPTED);
    }

    function store(Request $request)
    {

        dd("Working");

        $data = $request->only('first_name', 'last_name', 'email')
        + ['password'  => Hash::make('password')];
        
        // return response($data);
        // return User::create($data, Response::HTTP_CREATED);

    }

    function update(Request $request,$id)
    {
        $user = User::find($id);
        $user->update($request->only('first_name', 'last_name', 'email'));
        return response($user, Response::HTTP_ACCEPTED);
    } 

    function destroy($id)
    {
        User::destroy($id);

        return Response(null, Response::HTTP_NO_CONTENT);
    }
}
