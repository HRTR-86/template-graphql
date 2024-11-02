<?php declare(strict_types=1);

namespace App\Http\Controllers\Page\Login;

use App\Enums\Common\ErrorCode;
use App\Http\Controllers\Controller;
use Exception;
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
        try {
            Auth::logout();

            return redirect()->route('top');

        } catch (Exception $e) {
            return back()->withErrors(
                $this->getError(ErrorCode::LO9902, $e)
            );
        }
    }
}
