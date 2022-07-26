<?php

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

Route::get('user', [AuthController::class, 'user']);

// Admin Routes
Route::group([
    'middleware' => 'scope.admin',
], function () {
    Route::get('chart', [DashboardController::class, 'chart']);
    Route::post('image', [ImageController::class, 'upload']);
    Route::get("export", [OrderController::class, 'export']);

    Route::apiResource("users", UserController::class);
    Route::apiResource('roles', RoleController::class);
    Route::apiResource('products', ProductController::class);
    Route::apiResource('orders', OrderController::class)->only('index', 'show');
    Route::apiResource('permissions', PermissionController::class)->only('index');
});
