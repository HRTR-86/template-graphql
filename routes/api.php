<?php declare(strict_types=1);

use App\Http\Controllers\Api\Home\HomeController;
use App\Http\Controllers\Api\Mst\RoleListController;
use App\Http\Controllers\Api\Mst\SampleStatusListController;
use App\Http\Controllers\Api\Profile\ProfileController;
use App\Http\Controllers\Api\Sample\SampleCreateInitialController;
use App\Http\Controllers\Api\Sample\SampleDetailController;
use App\Http\Controllers\Api\Sample\SampleEditInitialController;
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

Route::get('/home', HomeController::class)->middleware('auth:sanctum');

Route::get('/profile', ProfileController::class)->middleware('auth:sanctum');

Route::get('/sample/detail/{parent_id}', SampleDetailController::class)->middleware('auth:sanctum')->where(['id' => '[0-9]+']);

Route::get('/sample-create', SampleCreateInitialController::class)->middleware('auth:sanctum');
Route::get('/sample-edit/{parent_id}', SampleEditInitialController::class)->middleware('auth:sanctum')->where(['id' => '[0-9]+']);

Route::get('/role/list', RoleListController::class);

Route::get('/sample-status/list', SampleStatusListController::class);
