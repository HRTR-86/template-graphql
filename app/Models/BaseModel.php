<?php declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Throwable;

class BaseModel extends Model
{
    /**
     * 保存する
     * @param int $operationUserId
     * @param bool $isDirtyCheck
     * @return BaseModel
     * @throws Throwable
     */
    public function storage(int $operationUserId, bool $isDirtyCheck = true): static
    {
        if ($isDirtyCheck) {
            if ($this->isDirty()) {
                $this->updated_by = $operationUserId;
                $this->saveOrFail();
            }
        } else {
            $this->updated_by = $operationUserId;
            $this->saveOrFail();
        }

        return $this;
    }

    /**
     * 論理削除する
     * @param int $operationUserId
     * @return void
     * @throws Throwable
     */
    public function softDelete(int $operationUserId): void
    {
        $this->updated_by = $operationUserId;
        $this->deleted_at = now();
        $this->saveOrFail();
    }
}
