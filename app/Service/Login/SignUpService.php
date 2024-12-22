<?php declare(strict_types=1);

namespace App\Service\Login;

use App\Enums\Mst\Role;
use App\Models\Auth\AuthUser;
use App\Models\Trn\TrnUserRole;
use App\Usecases\Login\SignUpInput;
use Illuminate\Support\Facades\Auth;
use Throwable;

class SignUpService
{
    /**
     * 新規登録処理を実行する
     * @param SignUpInput $input
     * @return void
     * @throws Throwable
     */
    public function handle(SignUpInput $input): void
    {
        $authUser = $this->createUser($input);
        $this->createRole($authUser);

        Auth::login($authUser);
    }

    /**
     * ユーザーを新規登録する
     * @param SignUpInput $input
     * @return AuthUser
     * @throws Throwable
     */
    private function createUser(SignUpInput $input): AuthUser
    {
        $authUser = new AuthUser;

        $authUser->name      = $input->name;
        $authUser->email     = $input->email;
        $authUser->password  = $input->password;

        $authUser->saveOrFail();

        return $authUser;
    }

    /**
     * ユーザーのロールを登録する
     * @param AuthUser $authUser
     * @return void
     * @throws Throwable
     */
    private function createRole(AuthUser $authUser): void
    {
        $trnUserRole = new TrnUserRole;

        $trnUserRole->user_id    = $authUser->id;
        $trnUserRole->role_id    = Role::GENERAL_USER;
        $trnUserRole->is_current = true;

        $trnUserRole->saveOrFail();
    }
}
