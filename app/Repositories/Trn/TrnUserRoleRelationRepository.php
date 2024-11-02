<?php declare(strict_types=1);

namespace App\Repositories\Trn;

use App\Models\Trn\TrnUserRole;

class TrnUserRoleRelationRepository
{
    /**
     * 現在のロールを取得する
     * @param int $parentId
     * @param array $with
     * @return TrnUserRole
     */
    public static function findCurrentRole(int $operationUserId): TrnUserRole
    {
        return TrnUserRole::where('user_id', $operationUserId)
            ->where('is_current', 1)
            ->whereNull('deleted_at')
            ->first();
    }

    /**
     * ロールIDを指定してデータを取得する
     * @param int $roleId
     * @param int $operationUserId
     * @return TrnUserRole
     */
    public static function findByRoleId(int $roleId, int $operationUserId): TrnUserRole
    {
        return TrnUserRole::where('user_id', $operationUserId)
            ->where('role_id', $roleId)
            ->whereNull('deleted_at')
            ->first();
    }
}
