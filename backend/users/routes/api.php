<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
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
Route::get("login", [AuthController::class, "index"]);


Route::post("login", [AuthController::class, "login"]);
Route::post("logout", [AuthController::class, "logout"]);
Route::post("register", [AuthController::class, "register"]);

// middleware(['auth:api','scope:admin'])
Route::group([
    'middleware' => 'auth:api'
], function () {
    Route::get('user', [AuthController::class, "user"]);
    Route::put('info', [AuthController::class, "updateInfo"]);
    Route::put('password', [AuthController::class, "updatePassword"]);

    Route::get('admin', [AuthController::class, "authenticated"])->middleware('scope:admin');
    Route::get('influencer', [AuthController::class, "authenticated"])->middleware('scope:influencer');
    Route::apiResource('users', UserController::class);
});
