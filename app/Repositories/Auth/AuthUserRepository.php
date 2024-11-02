<?php declare(strict_types=1);

namespace App\Repositories\Auth;

use App\Models\Auth\AuthUser;
use Illuminate\Database\Eloquent\Builder;

class AuthUserRepository
{
    /**
     * email指定でデータを取得する
     * @param string $email
     * @return AuthUser|Builder|null
     */
    public static function findByEmail(string $email): AuthUser|Builder|null
    {
        return AuthUser::query()
            ->where('email', $email)
            ->first();
    }
}
