<?php declare(strict_types=1);

namespace App\Usecases\Sample\Delete;

readonly class SampleDeleteOutput
{
    /**
     * @return array
     */
    public function getFlash(): array
    {
        return [
            'message' => '親テーブルデータの削除が完了しました',
        ];
    }
}
