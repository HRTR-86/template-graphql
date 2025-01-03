<?php declare(strict_types=1);

namespace App\Http\Controllers\Api\Sample;

use App\Http\Controllers\Controller;
use App\Http\Requests\Sample\SampleEditRequest;
use App\Service\Sample\Edit\SampleEditService;
use App\Usecases\Sample\Edit\SampleEditInput;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class SampleEditController extends Controller
{
    /**
     * @param SampleEditService $sampleEditService
     */
    public function __construct(
        private readonly SampleEditService $sampleEditService,
    ) {}

    /**
     * ページにアクセスした際に初期データを取得する
     * @param SampleEditRequest $request
     * @return JsonResponse
     */
    public function __invoke(SampleEditRequest $request): JsonResponse
    {
        $parameters = array_merge($request->all(), $request->route()->parameters());
        $input      = new SampleEditInput($parameters, Auth::id());
        DB::transaction(function () use ($input) {
            return $this->sampleEditService->handle($input);
        });

        return response()->json();
    }
}
