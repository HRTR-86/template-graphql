<?php declare(strict_types=1);

namespace App\Usecases\Sample\Create;

use App\Models\Trn\TrnSampleParent;

readonly class SampleCreateOutput
{
    /**
     * @param TrnSampleParent $trnSampleParent
     */
    public function __construct(
        private TrnSampleParent $trnSampleParent
    ) {}

    /**
     * @return array
     */
    public function getOutput(): array
    {
        return [
            'parent_id' => $this->trnSampleParent->id ?? 0,
        ];
    }

    /**
     * @return array
     */
    public function getFlash(): array
    {
        return [
            'message' => '親テーブルデータの登録が完了しました',
        ];
    }
}
