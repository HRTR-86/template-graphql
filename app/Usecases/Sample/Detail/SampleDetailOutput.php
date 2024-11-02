<?php declare(strict_types=1);

namespace App\Usecases\Sample\Detail;

use App\Models\Trn\TrnSampleChild;
use App\Models\Trn\TrnSampleParent;

readonly class SampleDetailOutput
{
    /**
     * @param TrnSampleParent|null $trnSampleParent
     */
    public function __construct(
        private ?TrnSampleParent $trnSampleParent
    ) {}

    /**
     * @return array
     */
    public function getOutput(): array
    {
        return [
            'trn_sample_parent' => $this->trnSampleParent(),
        ];
    }

    /**
     * @return array
     */
    private function trnSampleParent(): array
    {
        return [
            'id'                    => $this->trnSampleParent->id ?? 0,
            'name'                  => $this->trnSampleParent->name ?? '',
            'status_id'             => $this->trnSampleParent->status_id ?? '',
            'datetime'              => $this->trnSampleParent->datetime ?? '',
            'trn_sample_child_list' => $this->trnSampleParent?->trnSampleChild->map(function (TrnSampleChild $trnSampleChild) {
                return $this->trnSampleChild($trnSampleChild);
            })->toArray() ?? [],
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
