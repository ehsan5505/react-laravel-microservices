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


Route::get("hello",function(){
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
Route::post("login","AuthController@login");
Route::post("register","AuthController@register");

Route::group(['middleware'=>'auth:api'],function(){
    Route::get('user','UserController@user');
    Route::put('info','UserController@updateInfo');
    Route::put('password','UserController@updatePassword');
    Route::post('image',"ImageController@upload");

    Route::apiResource("users","UserController");
    Route::apiResource('roles','RoleController');
    Route::apiResource('products','ProductController');
});