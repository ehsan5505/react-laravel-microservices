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

Route::group(['middleware'=>'Auth:login'],function(){
    Route::apiResource("users","UserController");
});