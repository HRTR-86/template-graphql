<?php declare(strict_types=1);

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Service\Auth\AuthUserService;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class AuthUserController extends Controller
{
    /**
     * @param AuthUserService $authUserService
     */
    public function __construct(
        private readonly AuthUserService $authUserService,
    ) {}

    /**
     * @param Request $request
     * @return JsonResponse
     * @throws ValidationException
     * @throws Exception
     */
    public function __invoke(Request $request): JsonResponse
    {
        if (! Auth::check()) {
            throw new Exception('未認証のためアクセスできません');
        }

        $output = $this->authUserService->handle();

        return response()->json($output->getOutput());
    }
}
