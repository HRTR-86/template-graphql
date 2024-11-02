<?php declare(strict_types=1);

namespace App\Service\SampleChild;

use App\Models\Trn\TrnSampleChild;
use App\Usecases\SampleChild\SampleChildCreateInput;
use App\Usecases\SampleChild\SampleChildCreateOutput;
use Throwable;

class SampleChildCreateService
{
    /**
     * @param SampleChildCreateInput $input
     * @return SampleChildCreateOutput
     * @throws Throwable
     */
    public function handle(SampleChildCreateInput $input): SampleChildCreateOutput
    {
        $this->createSampleChild($input);

        return new SampleChildCreateOutput();
    }

    /**
     * 子テーブルのデータを登録する
     * @param SampleChildCreateInput $input
     * @return void
     * @throws Throwable
     */
    private function createSampleChild(SampleChildCreateInput $input): void
    {
        $trnSampleChild = new TrnSampleChild();

        $trnSampleChild->name       = $input->name;
        $trnSampleChild->created_by = $input->operationUserId;

        $trnSampleChild->storage($input->operationUserId);
    }
}
