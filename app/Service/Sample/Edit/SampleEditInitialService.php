<?php declare(strict_types=1);

namespace App\Service\Sample\Edit;

use App\Repositories\Trn\TrnSampleChildRepository;
use App\Repositories\Trn\TrnSampleParentRepository;
use App\Usecases\Sample\Edit\SampleEditInitialInput;
use App\Usecases\Sample\Edit\SampleEditInitialOutput;

class SampleEditInitialService
{
    /**
     * @param SampleEditInitialInput $input
     * @return SampleEditInitialOutput
     */
    public function handle(SampleEditInitialInput $input): SampleEditInitialOutput
    {
        $trnSampleParent = TrnSampleParentRepository::findById(
            $input->parentId,
            [
                'trnSampleChild',
            ],
        );

        $trnSampleChildList = TrnSampleChildRepository::list();

        return new SampleEditInitialOutput($trnSampleParent, $trnSampleChildList);
    }
}
