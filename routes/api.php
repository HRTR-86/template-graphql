<?php declare(strict_types=1);

use App\Http\Controllers\Api\Home\HomeController;
use App\Http\Controllers\Api\Mst\RoleListController;
use App\Http\Controllers\Api\Mst\SampleStatusListController;
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

Route::get('/role/list', RoleListController::class);

Route::get('/sample-status/list', SampleStatusListController::class);
