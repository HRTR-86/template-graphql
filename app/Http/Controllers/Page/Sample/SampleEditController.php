<?php declare(strict_types=1);

namespace App\Http\Controllers\Page\Sample;

use App\Enums\Common\ErrorCode;
use App\Http\Controllers\Controller;
use App\Http\Requests\Sample\SampleEditRequest;
use App\Http\Requests\SampleChild\SampleChildCreateRequest;
use App\Service\Sample\Edit\SampleEditInitialService;
use App\Service\Sample\Edit\SampleEditService;
use App\Service\SampleChild\SampleChildCreateService;
use App\Usecases\Sample\Edit\SampleEditInitialInput;
use App\Usecases\Sample\Edit\SampleEditInput;
use App\Usecases\SampleChild\SampleChildCreateInput;
use DB;
use Exception;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;
use Throwable;

class SampleEditController extends Controller
{
    /**
     * @param SampleEditInitialService $sampleEditInitialService
     * @param SampleEditService $sampleEditService
     * @param SampleChildCreateService $sampleChildCreateService
     */
    public function __construct(
        private readonly SampleEditInitialService $sampleEditInitialService,
        private readonly SampleEditService $sampleEditService,
        private readonly SampleChildCreateService $sampleChildCreateService,
    ) {}

    /**
     * ページにアクセスした際に初期データを取得する
     * @param Request $request
     * @return Response|RedirectResponse
     * @throws Exception
     * @throws Throwable
     */
    public function __invoke(Request $request): Response|RedirectResponse
    {
        $parameters = array_merge($request->all(), $request->route()->parameters());
        $input      = new SampleEditInitialInput($parameters);
        $output     = $this->sampleEditInitialService->handle($input);

        return Inertia::render(
            'Sample/Edit/SampleEditIndex',
            $output->getOutput(),
        );
    }

    /**
     * 親テーブルのデータを編集する
     * @param SampleEditRequest $request
     * @return Response|RedirectResponse
     * @throws Throwable
     */
    public function edit(SampleEditRequest $request): Response|RedirectResponse
    {
        try {
            $parameters = array_merge($request->all(), $request->route()->parameters());
            $input      = new SampleEditInput($parameters, Auth::id());
            $output     = DB::transaction(function () use ($input) {
                return $this->sampleEditService->handle($input);
            });

            return redirect()->route('sample.detail', $output->getOutput())
                ->with('flash', $output->getFlash());

        } catch (Exception $e) {
            return back()->withErrors(
                $this->getError(ErrorCode::SA1101, $e)
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

            return redirect()->route('sample.edit', [
                'parent_id' => $input->parentId,
            ])->with('flash', $output->getFlash());

        } catch (Exception $e) {
            return back()->withErrors(
                $this->getError(ErrorCode::SA1003, $e)
            );
        }
    }
}
