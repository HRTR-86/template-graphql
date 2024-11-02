<?php declare(strict_types=1);

namespace App\Repositories\Trn;

use App\Models\Trn\TrnSampleRelation;
use Illuminate\Support\Collection;

class TrnSampleRelationRepository
{
    /**
     * 親IDを指定してデータを取得する
     * @param int $parentId
     * @param array $with
     * @return Collection
     */
    public static function listByParentId(int $parentId, array $with = []): Collection
    {
        return TrnSampleRelation::query()
            ->with($with)
            ->where('parent_id', $parentId)
            ->whereNull('deleted_at')
            ->get();
    }

    /**
     * @param int $parentId
     * @param Collection $childIdList
     * @return Collection
     */
    public static function findByParentIdAndNotInChildId(int $parentId, Collection $childIdList): Collection
    {
        return TrnSampleRelation::query()
            ->where('parent_id', $parentId)
            ->whereNotIn('child_id', $childIdList)
            ->whereNull('deleted_at')
            ->get();
    }
}
