<?php

namespace App\Http\Controllers;

use App\Http\Resources\RoleResource;
use App\Models\Role;
use Illuminate\Http\Request;
use Microservice\UserService;
use Symfony\Component\HttpFoundation\Response;


class RoleController
{
    private $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    public function index()
    {
        $this->userService->allows('view','roles');
        return RoleResource::collection(Role::all());
    }

    public function store(Request $request)
    {
        $this->userService->allows('edit','roles');
        $role = Role::create($request->only('name'));
        $permissions = $request->input('permissions');

        // Insert the Permission in the Pivot table
        foreach($permissions as $permission_id)
        {
            \DB::table('role_permission')->insert([
                'role_id'       => $role->id,
                'permission_id' => $permission_id
            ]);
        }
        return response(new RoleResource($role),Response::HTTP_CREATED);
    }

    public function show($id)
    {
        $this->userService->allows('view','roles');
        $role = Role::find($id);
        return response(new RoleResource($role),Response::HTTP_ACCEPTED);        
    }

    public function update(Request $request, $id)
    {
        $this->userService->allows('edit','roles');
        $role = Role::find($id);
        // Delete the Old Permission Relationship from the Pivot
        \DB::table('role_permission')->where('role_id',$role->id)->delete();

        // Insert the Permission on Pivot Table for relationship
        $permissions = $request->input('permissions');
        foreach($permissions as $permission_id)
        {
            \DB::table('role_permission')->insert([
                'role_id'       => $role->id,
                'permission_id' => $permission_id
            ]);
        }

        $role->update($request->only('name'));
        return response(new RoleResource($role),Response::HTTP_ACCEPTED);
    }

    public function destroy($id)
    {
        $this->userService->allows('edit','roles');
        // Delete the Old Permission Relationship from the Pivot
        \DB::table('role_permission')->where('role_id',$id)->delete();
        // Delete the Role
        Role::destroy($id);

        return response(null,Response::HTTP_NO_CONTENT);
    }
}
