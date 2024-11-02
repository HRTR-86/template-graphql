<?php declare(strict_types=1);

namespace App\Http\Controllers\Page\Sample;

use App\Http\Controllers\Controller;
use App\Service\Sample\Delete\SampleDeleteService;
use App\Service\Sample\Detail\SampleDetailService;
use App\Usecases\Sample\Delete\SampleDeleteInput;
use App\Usecases\Sample\Detail\SampleDetailInput;
use Exception;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;
use Throwable;

class SampleDetailController extends Controller
{
    /**
     * @param SampleDetailService $sampleDetailService
     * @param SampleDeleteService $sampleDeleteService
     */
    public function __construct(
        private readonly SampleDetailService $sampleDetailService,
        private readonly SampleDeleteService $sampleDeleteService,
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
        $input      = new SampleDetailInput($parameters);
        $output     = $this->sampleDetailService->handle($input);

        return Inertia::render(
            'Sample/Detail/SampleDetailIndex',
            $output->getOutput(),
        );
    }

    /**
     * @param Request $request
     * @return RedirectResponse
     * @throws Throwable
     */
    public function delete(Request $request): RedirectResponse
    {
        $parameters = array_merge($request->all(), $request->route()->parameters());
        $input      = new SampleDeleteInput($parameters, Auth::id());
        $output     = DB::transaction(function () use ($input) {
            return $this->sampleDeleteService->handle($input);
        });

        return redirect()->route('home')
            ->with('flash', $output->getFlash());
    }
}
