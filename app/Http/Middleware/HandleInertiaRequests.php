<?php declare(strict_types=1);

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            'auth_user'       => $this->getAuthUser(),
            'permission_list' => $this->getPermissionList(),
            'errors'          => Inertia::always($this->getErrorMessageList($request)),
            'flash'           => fn () => $request->session()->get('flash'),
        ];
    }

    /**
     * バリデーションのエラーメッセージの一覧を取得する
     * @param $request
     * @return array
     */
    private function getErrorMessageList($request): array
    {
        if (! $request->hasSession() || ! $request->session()->has('errors')) {
            return [];
        }

        return $request->session()->get('errors')->toArray();
    }

    /**
     * 認証済みユーザーの情報を取得する
     * @return array|null
     */
    private function getAuthUser(): ?array
    {
        $authUser = Auth::user();

        return [
            'id'        => $authUser->id ?? 0,
            'name'      => $authUser->name ?? '',
            'email'     => $authUser->email ?? '',
            'image_url' => $authUser->image_url ?? '',
        ];
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
