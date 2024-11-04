<?php declare(strict_types=1);

namespace App\Service\Login;

use App\Repositories\Auth\AuthUserRepository;
use App\Usecases\Login\LoginInput;
use Exception;
use Illuminate\Support\Facades\Auth;

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

        // TODO: 専用の例外クラスを作成する
        if (is_null($authUser)) {
            throw new Exception('ユーザが存在しません');
        }

        // TODO: パスワードをハッシュ化する
        if ($input->password !== $authUser->password) {
            throw new Exception('パスワードが一致しません');
        }

        Auth::login($authUser);
    }
}
