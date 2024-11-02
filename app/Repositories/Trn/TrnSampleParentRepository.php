<?php declare(strict_types=1);

namespace App\Repositories\Trn;

use App\Models\Trn\TrnSampleParent;
use Illuminate\Support\Collection;

class TrnSampleParentRepository
{
    /**
     * IDを指定してデータを取得する
     * @param int $id
     * @param array $with
     * @return TrnSampleParent|null
     */
    public static function findById(int $id, array $with = []): ?TrnSampleParent
    {
        return TrnSampleParent::query()
            ->with($with)
            ->find($id);
    }

    /**
     * 作成者を指定してデータを取得する
     * @param int $operationUserId
     * @param array $with
     * @return Collection
     */
    public static function lstByCreateUserId(int $operationUserId, array $with = []): Collection
    {
        return TrnSampleParent::query()
            ->with($with)
            ->where('created_by', $operationUserId)
            ->whereNull('deleted_at')
            ->get();
    }
}
