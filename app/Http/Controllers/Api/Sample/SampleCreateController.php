<?php declare(strict_types=1);

namespace App\Http\Controllers\Api\Sample;

use App\Http\Controllers\Controller;
use App\Http\Requests\Sample\SampleCreateRequest;
use App\Service\Sample\Create\SampleCreateService;
use App\Usecases\Sample\Create\SampleCreateInput;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class SampleCreateController extends Controller
{
    /**
     * @param SampleCreateService $sampleCreateService
     */
    public function __construct(
        private readonly SampleCreateService $sampleCreateService,
    ) {}

    /**
     * @param SampleCreateRequest $request
     * @return JsonResponse
     */
    public function __invoke(SampleCreateRequest $request): JsonResponse
    {
        $parameters = array_merge($request->all(), $request->route()->parameters());
        $input      = new SampleCreateInput($parameters, Auth::id());
        DB::transaction(function () use ($input) {
            return $this->sampleCreateService->handle($input);
        });

        return response()->json();
    }
}
