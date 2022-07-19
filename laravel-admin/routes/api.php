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

// User Route
Route::group([
    'middleware'    =>  'auth:api'
], function () {
    Route::get('user', 'AuthController@user');
});


// Admin Routes
Route::group([
    'middleware' => ['auth:api', 'scope:admin'],
    'prefix' => 'admin',
    'namespace' => 'Admin',
], function () {
    Route::get('chart', 'DashboardController@chart');
    Route::post('image', "ImageController@upload");
    Route::get("export", "OrderController@export");

    Route::apiResource("users", "UserController");
    Route::apiResource('roles', 'RoleController');
    Route::apiResource('products', 'ProductController');
    Route::apiResource('orders', 'OrderController')->only('index', 'show');
    Route::apiResource('permissions', 'PermissionController')->only('index');
});

// Influencer Routes
Route::prefix("influencer")->group(function () {

    Route::get('products', 'Influencer\ProductController@index');

    Route::middleware(['auth:api', 'scope:influencer'])->group(function () {

        Route::namespace('Influencer')->group(function () {
            Route::post('links', "LinkController@store");
            Route::get('stats', "StatsController@index");
            Route::get('rankings', "StatsController@rankings");
        });
    });
});


// Checkout Routes
Route::group(
    [
        'prefix'    =>  'checkout',
        'namespace' =>  'Checkout',
    ],
    function () {
        Route::get("links/{code}", "LinkController@show");
        Route::post('orders', "OrderController@store");
        Route::post("orders/confirm", "OrderController@confirm");
    }
);
