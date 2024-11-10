<?php declare(strict_types=1);

namespace App\Usecases\Profile;

use App\Models\Trn\TrnUserRole;
use Illuminate\Support\Collection;

readonly class ProfileInitialOutput
{
    /**
     * @param Collection $trnUserRoleList
     */
    public function __construct(
        private Collection $trnUserRoleList,
    ) {}

    /**
     * @return array
     */
    public function getOutput(): array
    {
        return [
            'trn_user_role_list' => $this->trnUserRoleList?->map(function (TrnUserRole $trnUserRole) {
                return [
                    'role_id'    => $trnUserRole->role_id,
                    'is_current' => $trnUserRole->is_current,
                ];
            }) ?? [],
        ];
    }
}
