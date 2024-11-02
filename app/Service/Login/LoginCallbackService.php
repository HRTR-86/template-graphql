<?php declare(strict_types=1);

namespace App\Service\Login;

use App\Models\Auth\AuthUser;
use App\Repositories\Auth\AuthUserRepository;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Contracts\User;
use Laravel\Socialite\Facades\Socialite;
use Throwable;

class LoginCallbackService
{
    /**
     * ログイン処理を実行する
     * @return void
     * @throws Throwable
     */
    public function handle(): void
    {
        $socialiteUser = Socialite::driver('google')->user();

        $authUser = AuthUserRepository::findByEmail($socialiteUser->email);

        if (is_null($authUser)) {
            $authUser = $this->createUser($socialiteUser);
        } else {
            $authUser = $this->updateUser($socialiteUser, $authUser);
        }

        Auth::login($authUser);
    }

    /**
     * ユーザーを新規登録する
     * @param User $socialiteUser
     * @return AuthUser
     * @throws Throwable
     */
    private function createUser(User $socialiteUser): AuthUser
    {
        $trnUser = new AuthUser();

        $trnUser->name      = $socialiteUser->getName();
        $trnUser->email     = $socialiteUser->getEmail();
        $trnUser->image_url = $socialiteUser->getAvatar();

        $trnUser->saveOrFail();

        return $trnUser;
    }

    /**
     * ユーザー情報を更新する
     * @param User $socialiteUser
     * @param AuthUser $trnUser
     * @return AuthUser
     * @throws Throwable
     */
    private function updateUser(User $socialiteUser, AuthUser $trnUser): AuthUser
    {
        $trnUser->image_url = $socialiteUser->getAvatar();

        $trnUser->saveOrFail();

        return $trnUser;
    }
}
