<?php declare(strict_types=1);

namespace App\Http\Controllers\Page\Login;

use App\Enums\Common\ErrorCode;
use App\Http\Controllers\Controller;
use App\Http\Requests\Login\LoginRequest;
use App\Service\Login\LoginService;
use App\Usecases\Login\LoginInput;
use Exception;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Laravel\Socialite\Facades\Socialite;
use Symfony\Component\HttpFoundation\RedirectResponse;

class LoginController extends Controller
{
    /**
     * @param LoginService $loginService
     */
    public function __construct(
        private readonly LoginService $loginService,
    ) {}

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
                $this->getError(ErrorCode::LO9902, $e),
            );
        }
    }

    /**
     * @param LoginRequest $request
     * @return RedirectResponse|Response
     */
    public function login(LoginRequest $request): RedirectResponse|Response
    {
        try {
            $parameters = array_merge($request->all(), $request->route()->parameters());
            $input      = new LoginInput($parameters);
            $this->loginService->handle($input);

            return Inertia::render(
                'Home/HomeIndex',
            );

        } catch (Exception $e) {
            return back()->withErrors(
                $this->getError(ErrorCode::LO9904, $e)
            );
        }
    }
}
