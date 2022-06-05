<?php

namespace App\Http\Controllers;

use App\Role;
use Illuminate\Http\Request;
use Response;

class RoleController extends Controller
{
    public function index()
    {
        return Role::all();
    }

    public function store(Request $request)
    {
        $role = Role::create(['name' => $request->only('name')]);
        return response($role,Response::HTTP_CREATED);
    }

    public function show($id)
    {
        $role = Role::find($id);
        return response($role,Response::HTTP_ACCEPTED);        
    }

    public function update(Request $request, $id)
    {
        $role = Role::find($id);
        $role->update($request->only('name'));
        return response($role,Response::HTTP_ACCEPTED);
    }

    public function destroy($id)
    {
        Role::destroy($id);

        return response(null,Response::HTTP_NO_CONTENT);
    }
}
