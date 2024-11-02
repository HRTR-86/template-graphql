<?php declare(strict_types=1);

namespace App\Http\Controllers\Page\Home;

use App\Enums\Common\ErrorCode;
use App\Http\Controllers\Controller;
use App\Service\Home\HomeInitialService;
use App\Usecases\Home\HomeInitialInput;
use Auth;
use Exception;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    /**
     * @param HomeInitialService $homeInitialService
     */
    public function __construct(
        private readonly HomeInitialService $homeInitialService,
    ) {}

    /**
     * @param Request $request
     * @return Response
     */
    public function __invoke(Request $request): Response
    {
        try {
            if (! Auth::check()) {
                throw new Exception('未認証のためアクセスできません');
            }

            $input  = new HomeInitialInput(Auth::id());
            $output = $this->homeInitialService->handle($input);

            return Inertia::render(
                'Home/HomeIndex',
                $output->getOutput(),
            );

        } catch (Exception  $e) {
            return Inertia::render(
                'Error/ErrorIndex',
                $this->getError(ErrorCode::HO1201, $e),
            );
        }
    }
}
