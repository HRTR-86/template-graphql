<?php declare(strict_types=1);

namespace App\Usecases\Home;

use App\Models\Trn\TrnSampleChild;
use App\Models\Trn\TrnSampleParent;
use Illuminate\Support\Collection;

readonly class HomeInitialOutput
{
    /**
     * @param Collection<TrnSampleParent> $trnSampleParentList
     */
    public function __construct(
        private Collection $trnSampleParentList
    ) {}

    /**
     * @return array
     */
    public function getOutput(): array
    {
        return [
            'trn_sample_parent_list' => $this->trnSampleParentList->map(function (TrnSampleParent $trnSampleParent) {
                return [
                    'id'                    => $trnSampleParent->id,
                    'name'                  => $trnSampleParent->name,
                    'status_id'             => $trnSampleParent->status_id,
                    'datetime'              => $trnSampleParent->datetime,
                    'trn_sample_child_list' => $trnSampleParent->trnSampleChild->map(function ($trnSampleChild) {
                        return $this->trnSampleChild($trnSampleChild);
                    })->toArray(),
                ];
            })->toArray(),
        ];
    }

    /**
     * @param TrnSampleChild $trnSampleChild
     * @return array
     */
    private function trnSampleChild(TrnSampleChild $trnSampleChild): array
    {
        return [
            'id'   => $trnSampleChild->id,
            'name' => $trnSampleChild->name,
        ];
    }
}
