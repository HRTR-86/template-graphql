<?php declare(strict_types=1);

namespace App\Http\Controllers\Api\Profile;

use App\Http\Controllers\Controller;
use App\Http\Requests\Profile\ProfileEditRequest;
use App\Service\Profile\ProfileEditService;
use App\Usecases\Profile\ProfileEditInput;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ProfileEditController extends Controller
{
    /**
     * @param ProfileEditService $profileEditService
     */
    public function __construct(
        private readonly ProfileEditService $profileEditService,
    ) {}

    /**
     * @param ProfileEditRequest $request
     * @return JsonResponse
     * @throws Exception
     */
    public function __invoke(ProfileEditRequest $request): JsonResponse
    {
        if (! Auth::check()) {
            throw new Exception('未認証のためアクセスできません');
        }

        $parameters = array_merge($request->all(), $request->route()->parameters());
        $input      = new ProfileEditInput($parameters, Auth::id());
        DB::transaction(function () use ($input) {
            return $this->profileEditService->handle($input);
        });

        return response()->json();
    }
}
