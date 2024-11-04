<?php declare(strict_types=1);

namespace App\Http\Controllers\Page\Login;

use App\Enums\Common\ErrorCode;
use App\Http\Controllers\Controller;
use App\Service\Login\GoogleLoginService;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;
use Laravel\Socialite\Facades\Socialite;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Throwable;

class GoogleLoginController extends Controller
{
    /**
     * @param GoogleLoginService $googleLoginService
     */
    public function __construct(private readonly GoogleLoginService $googleLoginService) {}

    /**
     * Google認証画面にリダイレクトする
     * @param Request $request
     * @return RedirectResponse|Response
     */
    public function __invoke(Request $request): RedirectResponse|Response
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

    /**
     * ログイン処理を実行する
     * @return RedirectResponse|Response
     * @throws Throwable
     */
    public function callback(): RedirectResponse|Response
    {
        try {
            DB::transaction(function () {
                $this->googleLoginService->handle();
            });

        } catch (Exception $e) {
            return Inertia::render(
                'Error/ErrorIndex',
                $this->getError(ErrorCode::LO9903, $e),
            );
        }

        return redirect()->route('home');
    }
}
