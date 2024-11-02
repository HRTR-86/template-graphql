<?php declare(strict_types=1);

namespace App\Service\Home;

use App\Repositories\Trn\TrnSampleParentRepository;
use App\Usecases\Home\HomeInitialInput;
use App\Usecases\Home\HomeInitialOutput;

class HomeInitialService
{
    /**
     * @param HomeInitialInput $input
     * @return HomeInitialOutput
     */
    public function handle(HomeInitialInput $input): HomeInitialOutput
    {
        $trnSampleParentList = TrnSampleParentRepository::lstByCreateUserId(
            $input->operationUserId,
            [
                'trnSampleChild',
            ],
        );

        return new HomeInitialOutput($trnSampleParentList);
    }
}
