<?php declare(strict_types=1);

namespace App\Usecases\SampleChild;

class SampleChildCreateOutput
{
    /**
     * @return array
     */
    public function getFlash(): array
    {
        return [
            'message' => 'データの登録が完了しました',
        ];
    }
}
