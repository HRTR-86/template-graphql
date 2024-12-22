<?php declare(strict_types=1);

namespace App\Service\Sample\Edit;

use App\Models\Trn\TrnSampleParent;
use App\Models\Trn\TrnSampleRelation;
use App\Repositories\Trn\TrnSampleParentRepository;
use App\Repositories\Trn\TrnSampleRelationRepository;
use App\Usecases\Sample\Edit\SampleEditInput;
use App\Usecases\Sample\Edit\SampleEditOutput;
use Throwable;

class SampleEditService
{
    /**
     * @param SampleEditInput $input
     * @return SampleEditOutput
     * @throws Throwable
     */
    public function handle(SampleEditInput $input): SampleEditOutput
    {
        $trnSampleParent = $this->editSampleParent($input);

        $this->modifyTrnSampleRelationList($input);

        return new SampleEditOutput($trnSampleParent);
    }

    /**
     * 親テーブルのデータを編集する
     * @param SampleEditInput $input
     * @return TrnSampleParent
     * @throws Throwable
     */
    private function editSampleParent(SampleEditInput $input): TrnSampleParent
    {
        $trnSampleParent = TrnSampleParentRepository::findById($input->parentId);

        $trnSampleParent->name       = $input->parentName;
        $trnSampleParent->status_id  = $input->statusId;
        $trnSampleParent->datetime   = $input->datetime;
        $trnSampleParent->created_by = $input->operationUserId;

        $trnSampleParent->storage($input->operationUserId);

        return $trnSampleParent;
    }

    /**
     * @param SampleEditInput $input
     * @return void
     */
    private function modifyTrnSampleRelationList(SampleEditInput $input): void
    {
        $trnSampleRelationList   = TrnSampleRelationRepository::listByParentId($input->parentId);
        $storagedChildIdList     = $trnSampleRelationList->pluck('child_id');
        $createTargetChildIdList = $input->childIdList->diff($storagedChildIdList);

        $createTargetChildIdList->map(function (int $childId) use ($input) {
            $this->createSampleRelation(
                $input,
                $childId,
            );
        });

        $deleteTargetChildList = TrnSampleRelationRepository::findByParentIdAndNotInChildId(
            $input->parentId,
            $input->childIdList,
        );

        $deleteTargetChildList->map(function (TrnSampleRelation $trnSampleRelation) use ($input) {
            $trnSampleRelation->softDelete($input->operationUserId);
        });
    }

    /**
     * リレーションを作成する
     * @param SampleEditInput $input
     * @param int $childId
     * @return void
     * @throws Throwable
     */
    private function createSampleRelation(
        SampleEditInput $input,
        int $childId,
    ): void {
        $trnSampleRelation = new TrnSampleRelation;

        $trnSampleRelation->parent_id  = $input->parentId;
        $trnSampleRelation->child_id   = $childId;
        $trnSampleRelation->created_by = $input->operationUserId;

        $trnSampleRelation->storage($input->operationUserId);
    }
}
