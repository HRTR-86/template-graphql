<?php declare(strict_types=1);

namespace App\Http\Controllers\Page\Sample;

use App\Enums\Common\ErrorCode;
use App\Http\Controllers\Controller;
use App\Http\Requests\Sample\SampleCreateRequest;
use App\Http\Requests\SampleChild\SampleChildCreateRequest;
use App\Service\Sample\Create\SampleCreateInitialService;
use App\Service\Sample\Create\SampleCreateService;
use App\Service\SampleChild\SampleChildCreateService;
use App\Usecases\Sample\Create\SampleCreateInput;
use App\Usecases\SampleChild\SampleChildCreateInput;
use Exception;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;
use Throwable;

class SampleCreateController extends Controller
{
    /**
     * @param SampleCreateInitialService $sampleCreateInitialService
     * @param SampleCreateService $sampleCreateService
     * @param SampleChildCreateService $sampleChildCreateService
     */
    public function __construct(
        private readonly SampleCreateInitialService $sampleCreateInitialService,
        private readonly SampleCreateService $sampleCreateService,
        private readonly SampleChildCreateService $sampleChildCreateService,
    ) {}

    /**
     * ページにアクセスした際に初期データを取得する
     * @param Request $request
     * @return Response|RedirectResponse
     * @throws Exception
     */
    public function __invoke(Request $request): Response|RedirectResponse
    {
        $output = $this->sampleCreateInitialService->handle();

        return Inertia::render(
            'Sample/Create/SampleCreateIndex',
            $output->getOutput(),
        );
    }

    /**
     * 親テーブルにデータを登録する
     * @param SampleCreateRequest $request
     * @return Response|RedirectResponse
     * @throws Throwable
     */
    public function create(SampleCreateRequest $request): Response|RedirectResponse
    {
        try {
            $parameters = array_merge($request->all(), $request->route()->parameters());
            $input      = new SampleCreateInput($parameters, Auth::id());
            $output     = DB::transaction(function () use ($input) {
                return $this->sampleCreateService->handle($input);
            });

            return redirect()->route('sample.detail', $output->getOutput())
                ->with('flash', $output->getFlash());

        } catch (Exception $e) {
            return back()->withErrors(
                $this->getError(ErrorCode::SA1001, $e)
            );
        }
    }

    /**
     * 子テーブルにデータを登録する
     * @param SampleChildCreateRequest $request
     * @return Response|RedirectResponse
     * @throws Throwable
     */
    public function createChild(SampleChildCreateRequest $request): Response|RedirectResponse
    {
        try {
            $parameters = array_merge($request->all(), $request->route()->parameters());
            $input      = new SampleChildCreateInput($parameters, Auth::id());
            $output     = DB::transaction(function () use ($input) {
                return $this->sampleChildCreateService->handle($input);
            });

            return redirect()->route('sample.create')->with('flash', $output->getFlash());

        } catch (Exception $e) {
            return back()->withErrors(
                $this->getError(ErrorCode::SA1002, $e)
            );
        }
    }
}
