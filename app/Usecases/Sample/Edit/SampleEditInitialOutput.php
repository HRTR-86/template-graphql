<?php declare(strict_types=1);

namespace App\Usecases\Sample\Edit;

use App\Models\Trn\TrnSampleChild;
use App\Models\Trn\TrnSampleParent;
use Illuminate\Support\Collection;

readonly class SampleEditInitialOutput
{
    /**
     * @param TrnSampleParent|null $trnSampleParent
     * @param Collection<TrnSampleChild> $trnSampleChildList
     */
    public function __construct(
        private ?TrnSampleParent $trnSampleParent,
        private Collection $trnSampleChildList,
    ) {}

    /**
     * @return array
     */
    public function getOutput(): array
    {
        return [
            'trn_sample_parent'     => $this->trnSampleParent(),
            'trn_sample_child_list' => $this->trnSampleChildList?->map(function (TrnSampleChild $trnSampleChild) {
                return $this->trnSampleChild($trnSampleChild);
            })->toArray(),
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
