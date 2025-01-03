<?php declare(strict_types=1);

namespace App\Http\Controllers\Api\Sample;

use App\Http\Controllers\Controller;
use App\Service\Sample\Delete\SampleDeleteService;
use App\Usecases\Sample\Delete\SampleDeleteInput;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Throwable;

class SampleDeleteController extends Controller
{
    /**
     * @param SampleDeleteService $sampleDeleteService
     */
    public function __construct(
        private readonly SampleDeleteService $sampleDeleteService,
    ) {}

    /**
     * @param Request $request
     * @return JsonResponse
     * @throws Exception
     * @throws Throwable
     */
    public function __invoke(Request $request): JsonResponse
    {
        $parameters = array_merge($request->all(), $request->route()->parameters());
        $input      = new SampleDeleteInput($parameters, Auth::id());
        DB::transaction(function () use ($input) {
            return $this->sampleDeleteService->handle($input);
        });

        return response()->json();
    }
}
