<?php declare(strict_types=1);

namespace App\Service\Profile;

use App\Repositories\Trn\TrnUserRepository;
use App\Repositories\Trn\TrnUserRoleRelationRepository;
use App\Usecases\Profile\ProfileEditInput;
use App\Usecases\Profile\ProfileEditOutput;
use Throwable;

class ProfileEditService
{
    /**
     * @param ProfileEditInput $input
     * @return ProfileEditOutput
     * @throws Throwable
     */
    public function handle(ProfileEditInput $input): ProfileEditOutput
    {
        $this->editUser($input);
        $this->resetRole($input);
        $this->updateCurrentRole($input);

        return new ProfileEditOutput();
    }

    /**
     * ユーザーを編集する
     * @param ProfileEditInput $input
     * @throws Throwable
     */
    private function editUser(ProfileEditInput $input): void
    {
        $trnUser = TrnUserRepository::findById($input->operationUserId);

        $trnUser->name = $input->userName;
        $trnUser->storage($input->operationUserId);
    }

    /**
     * 現在のロールをリセットする
     * @param ProfileEditInput $input
     * @throws Throwable
     */
    private function resetRole(ProfileEditInput $input): void
    {
        $trnUserRoles = TrnUserRoleRelationRepository::findCurrentRole($input->operationUserId);

        $trnUserRoles->is_current = false;
        $trnUserRoles->storage($input->operationUserId);
    }

    /**
     * 現在のロールを更新する
     * @param ProfileEditInput $input
     * @throws Throwable
     */
    private function updateCurrentRole(ProfileEditInput $input): void
    {
        $trnUserRoles = TrnUserRoleRelationRepository::findByRoleId(
            $input->roleId,
            $input->operationUserId,
        );

        $trnUserRoles->is_current = true;
        $trnUserRoles->storage($input->operationUserId);
    }
}
