<?php declare(strict_types=1);

namespace App\Http\Controllers\Page\Login;

use App\Enums\Common\ErrorCode;
use App\Http\Controllers\Controller;
use App\Service\Login\LoginService;
use App\Usecases\Login\LoginInput;
use Exception;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Laravel\Socialite\Facades\Socialite;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Throwable;

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
     * @param Request $request
     * @return RedirectResponse|Response
     * @throws Throwable
     */
    public function login(Request $request): RedirectResponse|Response
    {
        try {
            $parameters = array_merge($request->all(), $request->route()->parameters());
            $input      = new LoginInput($parameters);
            $this->loginService->handle($input);

            // TODO: 新規登録機能へ移行する
            //            $email    = (string) $request->get('email');
            //            $password = (string) $request->get('password');
            //            $authUser = AuthUserRepository::findByEmail($email);
            //
            //            if (is_null($authUser)) {
            //                $$authUser = DB::transaction(function () use ($email) {
            //                    $authUser            = new AuthUser();
            //                    $authUser->name      = 'ログインテスト';
            //                    $authUser->email     = $email;
            //                    $authUser->image_url = '';
            //                    $authUser->saveOrFail();
            //
            //                    $trnUserRole          = new TrnUserRole();
            //                    $trnUserRole->user_id = $authUser->id;
            //                    $trnUserRole->role_id = 3;
            //                    $trnUserRole->saveOrFail();
            //
            //                    return $authUser;
            //                });
            //            }

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
