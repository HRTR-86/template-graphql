<?php declare(strict_types=1);

namespace App\Repositories\Trn;

use App\Models\Trn\TrnSampleChild;
use Illuminate\Support\Collection;

class TrnSampleChildRepository
{
    /**
     * データの一覧を取得する
     * @param array $with
     * @return Collection
     */
    public static function list(array $with = []): Collection
    {
        return TrnSampleChild::query()
            ->with($with)
            ->whereNull('deleted_at')
            ->get();
    }
}
