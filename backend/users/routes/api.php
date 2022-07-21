<?php

use App\Http\Controllers\AuthController;
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

Route::post("login", [AuthController::class, "login"]);
Route::post("logout", [AuthController::class, "logout"]);
Route::post("register", [AuthController::class, "register"]);

// middleware(['auth:api','scope:admin'])
Route::get('user', [AuthController::class, "user"]);
Route::middleware('auth:api')->group(function () {
    Route::get("test", [AuthController::class, "index"]);
    Route::put('info', [AuthController::class, "updateInfo"]);
    Route::put('password', [AuthController::class, "updatePassword"]);
});
