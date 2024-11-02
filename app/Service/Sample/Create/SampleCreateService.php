<?php declare(strict_types=1);

namespace App\Service\Sample\Create;

use App\Models\Trn\TrnSampleParent;
use App\Models\Trn\TrnSampleRelation;
use App\Usecases\Sample\Create\SampleCreateInput;
use App\Usecases\Sample\Create\SampleCreateOutput;
use Throwable;

class SampleCreateService
{
    /**
     * @param SampleCreateInput $input
     * @return SampleCreateOutput
     * @throws Throwable
     */
    public function handle(SampleCreateInput $input): SampleCreateOutput
    {
        $trnSampleParent = $this->createSampleParent($input);

        $this->modifySampleRelationList($input, $trnSampleParent->id);

        return new SampleCreateOutput($trnSampleParent);
    }

    /**
     * 親テーブルのデータを登録する
     * @param SampleCreateInput $input
     * @return TrnSampleParent
     * @throws Throwable
     */
    private function createSampleParent(SampleCreateInput $input): TrnSampleParent
    {
        $trnSampleParent = new TrnSampleParent();

        $trnSampleParent->name       = $input->parentName;
        $trnSampleParent->status_id  = $input->statusId;
        $trnSampleParent->datetime   = $input->datetime;
        $trnSampleParent->created_by = $input->operationUserId;

        $trnSampleParent->storage($input->operationUserId);

        return $trnSampleParent;
    }

    /**
     * @param SampleCreateInput $input
     * @param int $parentId
     * @return void
     */
    private function modifySampleRelationList(SampleCreateInput $input, int $parentId): void
    {
        $input->childIdList->map(function (int $childId) use ($input, $parentId) {
            $this->createSampleRelation(
                $input,
                $parentId,
                $childId,
            );
        });
    }

    /**
     * リレーションを登録する
     * @param SampleCreateInput $input
     * @param int $parentId
     * @param int $childId
     * @return void
     * @throws Throwable
     */
    private function createSampleRelation(
        SampleCreateInput $input,
        int $parentId,
        int $childId,
    ): void {
        $trnSampleRelation = new TrnSampleRelation();

        $trnSampleRelation->parent_id  = $parentId;
        $trnSampleRelation->child_id   = $childId;
        $trnSampleRelation->created_by = $input->operationUserId;

        $trnSampleRelation->storage($input->operationUserId);
    }
}
