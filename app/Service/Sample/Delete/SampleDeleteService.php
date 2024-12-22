<?php declare(strict_types=1);

namespace App\Service\Sample\Delete;

use App\Models\Trn\TrnSampleRelation;
use App\Repositories\Trn\TrnSampleParentRepository;
use App\Repositories\Trn\TrnSampleRelationRepository;
use App\Usecases\Sample\Delete\SampleDeleteInput;
use App\Usecases\Sample\Delete\SampleDeleteOutput;
use Throwable;

class SampleDeleteService
{
    /**
     * @param SampleDeleteInput $input
     * @return SampleDeleteOutput
     * @throws Throwable
     */
    public function handle(SampleDeleteInput $input): SampleDeleteOutput
    {
        $this->deleteSampleParent($input);

        $this->deleteTrnSampleRelationList($input);

        return new SampleDeleteOutput;
    }

    /**
     * 親テーブルのデータを削除する
     * @param SampleDeleteInput $input
     * @return void
     * @throws Throwable
     */
    private function deleteSampleParent(SampleDeleteInput $input): void
    {
        $trnSampleParent = TrnSampleParentRepository::findById($input->parentId);
        $trnSampleParent->softDelete($input->operationUserId);
    }

    /**
     * @param SampleDeleteInput $input
     * @return void
     */
    private function deleteTrnSampleRelationList(SampleDeleteInput $input): void
    {
        $trnSampleRelationList = TrnSampleRelationRepository::listByParentId($input->parentId);

        $trnSampleRelationList->map(function (TrnSampleRelation $trnSampleRelation) use ($input) {
            $trnSampleRelation->softDelete($input->operationUserId);
        });
    }
}
