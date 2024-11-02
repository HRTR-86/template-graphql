<?php declare(strict_types=1);

namespace App\Http\Controllers\Page\Login;

use App\Enums\Common\ErrorCode;
use App\Http\Controllers\Controller;
use Exception;
use Inertia\Inertia;
use Inertia\Response;
use Laravel\Socialite\Facades\Socialite;
use Symfony\Component\HttpFoundation\RedirectResponse;

class LoginController extends Controller
{
    /**
     * Google認証画面にリダイレクトする
     * @return RedirectResponse|Response
     */
    public function __invoke(): RedirectResponse|Response
    {
        try {
            return Socialite::driver('google')
                ->with(['prompt' => 'select_account'])
                ->redirect();

        } catch (Exception $e) {
            return Inertia::render(
                'Error/ErrorIndex',
                $this->getError(ErrorCode::LO9901, $e),
            );
        }
    }
}
