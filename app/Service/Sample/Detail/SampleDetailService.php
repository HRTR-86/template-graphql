<?php declare(strict_types=1);

namespace App\Service\Sample\Detail;

use App\Repositories\Trn\TrnSampleParentRepository;
use App\Usecases\Sample\Detail\SampleDetailInput;
use App\Usecases\Sample\Detail\SampleDetailOutput;

class SampleDetailService
{
    /**
     * @param SampleDetailInput $input
     * @return SampleDetailOutput
     */
    public function handle(SampleDetailInput $input): SampleDetailOutput
    {
        $trnSampleParent = TrnSampleParentRepository::findById(
            $input->parentId,
            [
                'trnSampleChild',
            ],
        );

        return new SampleDetailOutput($trnSampleParent);
    }
}
