<?php declare(strict_types=1);

use App\Http\Controllers\Page\Home\HomeController;
use App\Http\Controllers\Page\Login\LoginCallbackController;
use App\Http\Controllers\Page\Login\LoginController;
use App\Http\Controllers\Page\Login\LogoutController;
use App\Http\Controllers\Page\NotFound\NotFoundController;
use App\Http\Controllers\Page\Profile\ProfileController;
use App\Http\Controllers\Page\Sample\SampleCreateController;
use App\Http\Controllers\Page\Sample\SampleDetailController;
use App\Http\Controllers\Page\Sample\SampleEditController;
use App\Http\Controllers\Page\Top\TopController;
use Illuminate\Support\Facades\Route;

// 認証が不要なページ
Route::get('/', TopController::class)->name('top');

Route::get('/login', LoginController::class);

Route::get('/login/callback', LoginCallbackController::class);

Route::post('/logout', LogoutController::class);

// 認証が必要なページ
Route::middleware(['auth:web'])->group(function () {
    Route::get('/home', HomeController::class)->name('home');
    Route::post('/home/participant-status/update', [HomeController::class, 'updateParticipantStatus']);

    Route::get('/profile', ProfileController::class)->name('profile');
    Route::post('/profile', [ProfileController::class, 'edit']);

    Route::get('/sample/detail/{parent_id}', SampleDetailController::class)->name('sample.detail')->where(['id' => '[0-9]+']);
    Route::post('/sample/detail/delete', [SampleDetailController::class, 'delete']);

    Route::get('/sample/create', SampleCreateController::class)->name('sample.create');
    Route::post('/sample/create', [SampleCreateController::class, 'create'])->name('sample.create');
    Route::post('/sample/create/child/create', [SampleCreateController::class, 'createChild']);

    Route::get('/sample/edit/{parent_id}', SampleEditController::class)->name('sample.edit')->where(['id' => '[0-9]+']);
    Route::post('/sample/edit/{parent_id}', [SampleEditController::class, 'edit'])->name('sample.edit')->where(['id' => '[0-9]+']);
    Route::post('/sample/edit/{parent_id}/child/create', [SampleEditController::class, 'createChild'])->where(['id' => '[0-9]+']);

    Route::get('/not-found', NotFoundController::class)->name('not-found');
});

Route::fallback(function () {
    return redirect()->route('not-found');
});
