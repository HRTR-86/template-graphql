<?php declare(strict_types=1);

namespace App\Http\Controllers\Api\Sample;

use App\Http\Controllers\Controller;
use App\Http\Requests\SampleChild\SampleChildCreateRequest;
use App\Service\SampleChild\SampleChildCreateService;
use App\Usecases\SampleChild\SampleChildCreateInput;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class SampleChildCreateController extends Controller
{
    /**
     * @param SampleChildCreateService $sampleChildCreateService
     */
    public function __construct(
        private readonly SampleChildCreateService $sampleChildCreateService,
    ) {}

    /**
     * ページにアクセスした際に初期データを取得する
     * @param SampleChildCreateRequest $request
     * @return JsonResponse
     */
    public function __invoke(SampleChildCreateRequest $request): JsonResponse
    {
        $parameters = array_merge($request->all(), $request->route()->parameters());
        $input      = new SampleChildCreateInput($parameters, Auth::id());
        DB::transaction(function () use ($input) {
            return $this->sampleChildCreateService->handle($input);
        });

        return response()->json();
    }
}
