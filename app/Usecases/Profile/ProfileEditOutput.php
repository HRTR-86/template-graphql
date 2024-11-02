<?php declare(strict_types=1);

namespace App\Usecases\Profile;

readonly class ProfileEditOutput
{
    /**
     * @return array
     */
    public function getFlash(): array
    {
        return [
            'message' => 'プロフィールの編集が完了しました',
        ];
    }
}
