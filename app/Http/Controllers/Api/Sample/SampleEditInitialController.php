<?php declare(strict_types=1);

namespace App\Http\Controllers\Api\Sample;

use App\Http\Controllers\Controller;
use App\Service\Sample\Edit\SampleEditInitialService;
use App\Usecases\Sample\Edit\SampleEditInitialInput;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SampleEditInitialController extends Controller
{
    /**
     * @param SampleEditInitialService $sampleEditInitialService
     */
    public function __construct(
        private readonly SampleEditInitialService $sampleEditInitialService,
    ) {}

    /**
     * ページにアクセスした際に初期データを取得する
     * @param Request $request
     * @return JsonResponse
     */
    public function __invoke(Request $request): JsonResponse
    {
        $parameters = array_merge($request->all(), $request->route()->parameters());
        $input      = new SampleEditInitialInput($parameters);
        $output     = $this->sampleEditInitialService->handle($input);

        return response()->json($output->getOutput());
    }
}
