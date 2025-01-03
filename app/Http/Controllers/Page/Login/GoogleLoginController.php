<?php declare(strict_types=1);

namespace App\Http\Controllers\Page\Login;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Response;
use Laravel\Socialite\Facades\Socialite;
use Symfony\Component\HttpFoundation\RedirectResponse;

class GoogleLoginController extends Controller
{
    /**
     * Google認証画面にリダイレクトする
     * @param Request $request
     * @return RedirectResponse|Response
     */
    public function __invoke(Request $request): RedirectResponse|Response
    {
        return Socialite::driver('google')
            ->with(['prompt' => 'select_account'])
            ->redirect();
    }
}
