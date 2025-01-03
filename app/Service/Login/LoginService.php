<?php declare(strict_types=1);

namespace App\Service\Login;

use App\Models\Auth\AuthUser;
use App\Repositories\Auth\AuthUserRepository;
use App\Usecases\Login\LoginInput;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Throwable;

class LoginService
{
    /**
     * ログイン処理を実行する
     * @param LoginInput $input
     * @return void
     * @throws Exception
     * @throws Throwable
     */
    public function handle(LoginInput $input): void
    {
        $authUser = AuthUserRepository::findByEmail($input->email);

        if (is_null($authUser)) {
            throw ValidationException::withMessages([
                'email' => '指定されたメールアドレスは登録されていません',
            ]);
        }

        if (! Hash::check($input->password, $authUser->password)) {
            throw ValidationException::withMessages([
                'password' => '登録済みのパスワードと一致しません',
            ]);
        }

        $this->updateAccessToken($authUser);

        Auth::login($authUser);
    }

    /**
     * ユーザーのアクセストークンを更新する
     * @param AuthUser $authUser
     * @return void
     * @throws Throwable
     */
    private function updateAccessToken(AuthUser $authUser): void
    {
        $authUser->tokens()->delete();
        $token = $authUser->createToken('api_token');

        $authUser->access_token = $token;

        $authUser->saveOrFail();
    }
}
