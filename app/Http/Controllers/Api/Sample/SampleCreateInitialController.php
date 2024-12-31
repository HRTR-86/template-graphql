<?php declare(strict_types=1);

namespace App\Http\Controllers\Api\Sample;

use App\Http\Controllers\Controller;
use App\Service\Sample\Create\SampleCreateInitialService;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SampleCreateInitialController extends Controller
{
    /**
     * @param SampleCreateInitialService $sampleCreateInitialService
     */
    public function __construct(
        private readonly SampleCreateInitialService $sampleCreateInitialService,
    ) {}

    /**
     * ページにアクセスした際に初期データを取得する
     * @param Request $request
     * @return JsonResponse
     * @throws Exception
     */
    public function __invoke(Request $request): JsonResponse
    {
        $output = $this->sampleCreateInitialService->handle();

        return response()->json($output->getOutput());
    }
}
