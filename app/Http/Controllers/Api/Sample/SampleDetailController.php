<?php declare(strict_types=1);

namespace App\Http\Controllers\Api\Sample;

use App\Http\Controllers\Controller;
use App\Service\Sample\Detail\SampleDetailService;
use App\Usecases\Sample\Detail\SampleDetailInput;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SampleDetailController extends Controller
{
    /**
     * @param SampleDetailService $sampleDetailService
     */
    public function __construct(
        private readonly SampleDetailService $sampleDetailService,
    ) {}

    /**
     * ページにアクセスした際に初期データを取得する
     * @param Request $request
     * @return JsonResponse
     */
    public function __invoke(Request $request): JsonResponse
    {
        $parameters = array_merge($request->all(), $request->route()->parameters());
        $input      = new SampleDetailInput($parameters);
        $output     = $this->sampleDetailService->handle($input);

        return response()->json($output->getOutput());
    }
}
