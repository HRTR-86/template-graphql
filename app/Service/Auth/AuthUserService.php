<?php declare(strict_types=1);

namespace App\Service\Auth;

use App\Models\Auth\AuthUser;
use App\Usecases\Auth\AuthUserOutput;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class AuthUserService
{
    /**
     * @return AuthUserOutput
     */
    public function handle(): AuthUserOutput
    {
        $authUser       = $this->getAuthUser();
        $permissionList = $this->getPermissionList();

        return new AuthUserOutput($authUser, $permissionList);
    }

    /**
     * 認証済みユーザーの情報を取得する
     * @return array
     */
    private function getAuthUser(): array
    {
        $authUser = Auth::user();

        return [
            'id'           => $authUser?->id ?? 0,
            'name'         => $authUser?->name ?? '',
            'email'        => $authUser?->email ?? '',
            'image_url'    => $this->getImageUrl($authUser),
            'access_token' => $authUser?->access_token ?? '',
        ];
    }

    /**
     * @param AuthUser|null $authUser
     * @return string
     */
    private function getImageUrl(?AuthUser $authUser): string
    {
        if (is_null($authUser)) {
            return '';
        }

        if ((bool) $authUser->image_url) {
            return $authUser->image_url;
        }

        return Storage::disk('s3')->temporaryUrl(
            'default_icon.jpg', now()->addHour()
        );
    }

    /**
     * 権限一覧を取得する
     * @return array
     */
    private function getPermissionList(): array
    {
        $loginUser = Auth::user();
        if (is_null($loginUser)) {
            return [];
        }

        $loginUser       = $loginUser->with(['trnUserRole.mstRole'])->first();
        $trnUserRoleList = $loginUser->trnUserRole;

        if (is_null($trnUserRoleList)) {
            return [];
        }

        $currentRole = $loginUser->trnUserRole->firstWhere('is_current', 1);
        if (is_null($currentRole)) {
            $trnUserRole             = $trnUserRoleList->sortBy('id')->first();
            $trnUserRole->is_current = true;
            $trnUserRole->save();

            $currentRole = $trnUserRole;
        }

        $mstPermissionList = $currentRole->mstRole->mstPermission()->get();

        return $mstPermissionList->pluck('id')->toArray();
    }
}
