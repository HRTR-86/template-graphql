<?php declare(strict_types=1);

namespace App\Http\Controllers\Api\Profile;

use App\Http\Controllers\Controller;
use App\Service\Profile\ProfileInitialService;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProfileController extends Controller
{
    /**
     * @param ProfileInitialService $profileInitialService
     */
    public function __construct(
        private readonly ProfileInitialService $profileInitialService,
    ) {}

    /**
     * @param Request $request
     * @return JsonResponse
     * @throws Exception
     */
    public function __invoke(Request $request): JsonResponse
    {
        if (! Auth::check()) {
            throw new Exception('未認証のためアクセスできません');
        }

        $output = $this->profileInitialService->handle();

        return response()->json($output->getOutput());
    }
}
