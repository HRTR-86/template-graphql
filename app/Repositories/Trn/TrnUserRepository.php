<?php declare(strict_types=1);

namespace App\Repositories\Trn;

use App\Models\Trn\TrnUser;
use Illuminate\Database\Eloquent\Collection;
use Throwable;

class TrnUserRepository
{
    /**
     * IDを指定してデータを取得する
     * @param int $id
     * @return TrnUser|null
     */
    public static function findById(int $id): ?TrnUser
    {
        return TrnUser::query()
            ->find($id);
    }

    /**
     * email指定でデータを取得する
     * @param string $email
     * @return TrnUser|null
     */
    public static function findByEmail(string $email): ?TrnUser
    {
        return TrnUser::query()
            ->where('email', $email)
            ->first();
    }

    /**
     * ユーザー一覧を取得する
     * @return Collection
     */
    public static function listByActive(): Collection
    {
        return TrnUser::query()
            ->whereNull('deleted_At')
            ->get();
    }

    /**
     * データを保存する
     * @param TrnUser $model
     * @return TrnUser
     * @throws Throwable
     */
    public static function save(TrnUser $model): TrnUser
    {
        $model->saveOrFail();

        return $model;
    }
}
