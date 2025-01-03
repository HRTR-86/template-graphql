<?php declare(strict_types=1);

use App\Http\Controllers\Page\Common\IndexController;
use App\Http\Controllers\Page\Login\GoogleLoginCallbackController;
use App\Http\Controllers\Page\Login\GoogleLoginController;
use App\Http\Controllers\Page\Login\LoginController;
use App\Http\Controllers\Page\Login\LogoutController;
use App\Http\Controllers\Page\Login\SignUpController;
use Illuminate\Support\Facades\Route;

Route::middleware([])->group(function () {
    Route::get('/', IndexController::class)->name('top');

    Route::post('/sign-up', SignUpController::class);

    Route::post('/login', LoginController::class);

    Route::get('/login/google', GoogleLoginController::class);
    Route::get('/login/callback', GoogleLoginCallbackController::class);

    Route::post('/logout', LogoutController::class);
});

Route::middleware(['auth:web'])->group(function () {
    Route::get('/home', IndexController::class)->name('home');

    Route::get('/profile', IndexController::class)->name('profile');

    Route::get('/sample/detail/{parent_id}', IndexController::class)->name('sample.detail')->where(['id' => '[0-9]+']);

    Route::get('/sample/create', IndexController::class)->name('sample.create');

    Route::get('/sample/edit/{parent_id}', IndexController::class)->name('sample.edit')->where(['id' => '[0-9]+']);

    Route::get('/not-found', IndexController::class)->name('not-found');
});

Route::fallback(function () {
    return redirect('/not-found');
});
