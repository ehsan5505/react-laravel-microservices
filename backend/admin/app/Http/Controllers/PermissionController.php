<?php

namespace App\Http\Controllers;

use App\Http\Resources\PermissionResource;
use App\Models\Permission;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class PermissionController
{
    
    public function index(Request $request)
    {
        return response(PermissionResource::collection(Permission::all()), Response::HTTP_ACCEPTED);
    }
}
