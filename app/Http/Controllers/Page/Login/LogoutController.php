<?php declare(strict_types=1);

namespace App\Http\Controllers\Page\Login;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;

class LogoutController extends Controller
{
    /**
     * ログアウト処理を実行する
     * @return RedirectResponse
     */
    public function __invoke(): RedirectResponse
    {
        Auth::logout();

        return redirect('/');
    }
}
