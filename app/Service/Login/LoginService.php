<?php declare(strict_types=1);

namespace App\Service\Login;

use App\Repositories\Auth\AuthUserRepository;
use App\Usecases\Login\LoginInput;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class LoginService
{
    /**
     * ログイン処理を実行する
     * @param LoginInput $input
     * @return void
     * @throws Exception
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

        Auth::login($authUser);
    }
}
