<?php declare(strict_types=1);

namespace App\Http\Controllers\Page\Profile;

use App\Enums\Common\ErrorCode;
use App\Http\Controllers\Controller;
use App\Http\Requests\Profile\ProfileEditRequest;
use App\Models\Trn\TrnUserRole;
use App\Service\Profile\ProfileEditService;
use App\Usecases\Profile\ProfileEditInput;
use Auth;
use Exception;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;
use Throwable;

class ProfileController extends Controller
{
    /**
     * @param ProfileEditService $profileEditService
     */
    public function __construct(
        private readonly ProfileEditService $profileEditService,
    ) {}

    /**
     * @param Request $request
     * @return Response
     */
    public function __invoke(Request $request): Response
    {
        try {
            if (! Auth::check()) {
                throw new Exception('未認証のためアクセスできません');
            }

            $loginUser = Auth::user();
            $trnUser   = $loginUser->with(['trnUserRole'])->first();

            return Inertia::render(
                'Profile/ProfileIndex',
                [
                    'trn_user_role_list' => $trnUser?->trnUserRole?->map(function (TrnUserRole $trnUserRole) {
                        return [
                            'role_id'    => $trnUserRole->role_id,
                            'is_current' => $trnUserRole->is_current,
                        ];
                    }) ?? [],
                ],
            );

        } catch (Exception  $e) {
            return Inertia::render(
                'Error/ErrorIndex',
                $this->getError(ErrorCode::PR0101, $e),
            );
        }
    }

    /**
     * プロフィールを編集する
     * @param ProfileEditRequest $request
     * @return Response|RedirectResponse
     * @throws Throwable
     */
    public function edit(ProfileEditRequest $request): Response|RedirectResponse
    {
        try {
            if (! Auth::check()) {
                throw new Exception('未認証のためアクセスできません');
            }

            $parameters = array_merge($request->all(), $request->route()->parameters());
            $input      = new ProfileEditInput($parameters, Auth::id());
            $output     = DB::transaction(function () use ($input) {
                return $this->profileEditService->handle($input);
            });

            return redirect()->route('profile')
                ->with('flash', $output->getFlash());

        } catch (Exception  $e) {
            return back()->withErrors(
                $this->getError(ErrorCode::PR1101, $e)
            );
        }
    }
}
