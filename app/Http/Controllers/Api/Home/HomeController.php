<?php declare(strict_types=1);

namespace App\Http\Controllers\Api\Home;

use App\Http\Controllers\Controller;
use App\Service\Home\HomeInitialService;
use App\Usecases\Home\HomeInitialInput;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class HomeController extends Controller
{
    /**
     * @param HomeInitialService $homeInitialService
     */
    public function __construct(
        private readonly HomeInitialService $homeInitialService,
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

        $input  = new HomeInitialInput(Auth::id());
        $output = $this->homeInitialService->handle($input);

        return response()->json($output->getOutput());
    }
}
