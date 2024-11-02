<?php declare(strict_types=1);

namespace App\Service\Sample\Create;

use App\Repositories\Trn\TrnSampleChildRepository;
use App\Usecases\Sample\Create\SampleCreateInitialOutput;

class SampleCreateInitialService
{
    /**
     * @return SampleCreateInitialOutput
     */
    public function handle(): SampleCreateInitialOutput
    {
        $trnSampleChildList = TrnSampleChildRepository::list();

        return new SampleCreateInitialOutput($trnSampleChildList);
    }
}
