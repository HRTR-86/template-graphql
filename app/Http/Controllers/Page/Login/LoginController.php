<?php declare(strict_types=1);

namespace App\Http\Controllers\Page\Login;

use App\Enums\Common\ErrorCode;
use App\Http\Controllers\Controller;
use App\Models\Auth\AuthUser;
use App\Models\Trn\TrnUserRole;
use App\Repositories\Auth\AuthUserRepository;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
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
    public function __invoke(Request $request): RedirectResponse|Response
    {
        try {
            // Log::info($request->get('without'));
            $without = $request->get('without');

            if ($without) {
                return Inertia::render(
                    'Login/LoginIndex',
                );
            }

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
     * Google認証画面にリダイレクトする
     * @return RedirectResponse|Response
     */
    public function login(Request $request): RedirectResponse|Response
    {
        try {
            $email    = (string) $request->get('email');
            $password = (string) $request->get('password');
            $authUser = AuthUserRepository::findByEmail($email);

            if (is_null($authUser)) {
                $$authUser = DB::transaction(function () use ($email) {
                    $authUser            = new AuthUser();
                    $authUser->name      = 'ログインテスト';
                    $authUser->email     = $email;
                    $authUser->image_url = '';
                    $authUser->saveOrFail();

                    $trnUserRole          = new TrnUserRole();
                    $trnUserRole->user_id = $authUser->id;
                    $trnUserRole->role_id = 3;
                    $trnUserRole->saveOrFail();

                    return $authUser;
                });
            }

            Auth::login($authUser);

            return Inertia::render(
                'Home/HomeIndex',
            );

        } catch (Exception $e) {
            return Inertia::render(
                'Error/ErrorIndex',
                $this->getError(ErrorCode::LO9901, $e),
            );
        }
    }
}
