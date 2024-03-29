<?php

use App\Http\Controllers\Checkout\LinkController;
use App\Http\Controllers\Checkout\OrderController;
use Illuminate\Http\Request;
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

// Checkout Routes
Route::get("links/{code}", [LinkController::class, "show"]);
Route::post('orders', [OrderController::class, "store"]);
Route::post("orders/confirm", [OrderController::class, "confirm"]);
