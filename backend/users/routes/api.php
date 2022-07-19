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

Route::get("test",[AuthController::class,"index"]);

Route::post("login", [AuthController::class, "login"]);
Route::post("logout", [AuthController::class, "logout"]);
Route::post("register", [AuthController::class, "register"]);


Route::middleware(['auth:api', 'scope:admin'])->group(function () {
    Route::get('user', [AuthController::class, "user"]);
    Route::put('info', [AuthController::class, "updateInfo"]);
    Route::put('password', [AuthController::class, "updatePassword"]);
});
