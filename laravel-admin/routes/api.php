<?php

use Illuminate\Http\Request;
use Illuminate\Http\UserController;
use Illuminate\Support\Facades\Route;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::get("hello", function () {
    return "Hello World!";
});
// De-Active
// Route::get("index",'UserController@hello');
// Route::get("users",'UserController@index');
// Route::get("users/{id}","UserController@show");
// Route::post("users","UserController@create");
// Route::put("users/{id}","UserController@update");
// Route::delete("users/{id}","UserController@destroy");
// Active

// Comon Routes
Route::post("login", "AuthController@login");
Route::post("register", "AuthController@register");

// Common Routes | with Credentials access
Route::group(
    [
        'middleware'    =>  'auth:api'
    ],
    function () {
        Route::get('user', 'AuthController@user');
        Route::put('info', 'AuthController@updateInfo');
        Route::put('password', 'AuthController@updatePassword');
    }
);

// Admin Routes
Route::group(
    [
        'middleware' =>  ['auth:api', 'scope:admin'],
        'prefix'    =>  'admin',
        'namespace' =>  'Admin',
    ],
    function () {
        Route::post('logout', 'AuthController@logout');
        Route::get('chart', 'DashboardController@chart');
        Route::post('image', "ImageController@upload");
        Route::get("export", "OrderController@export");

        Route::apiResource("users", "UserController");
        Route::apiResource('roles', 'RoleController');
        Route::apiResource('products', 'ProductController');
        Route::apiResource('orders', 'OrderController')->only('index', 'show');
        Route::apiResource('permissions', 'PermissionController')->only('index');
    }
);

// Influencer
Route::group(
    [
        'prefix'    =>  'influencer',
        'namespace' =>  'Influencer',
        'middleware' =>  ['auth:api'],
    ],
    function () {
        Route::get('products', 'ProductController@index');
    }
);
