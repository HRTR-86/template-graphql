<?php declare(strict_types=1);

namespace App\Usecases\Sample\Create;

use App\Models\Trn\TrnSampleChild;
use Illuminate\Support\Collection;

readonly class SampleCreateInitialOutput
{
    /**
     * @param Collection<TrnSampleChild> $trnSampleChildList
     */
    public function __construct(
        private Collection $trnSampleChildList,
    ) {}

    /**
     * @return array
     */
    public function getOutput(): array
    {
        return [
            'trn_sample_child_list' => $this->trnSampleChildList?->map(function (TrnSampleChild $trnSampleChild) {
                return $this->trnSampleChild($trnSampleChild);
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
