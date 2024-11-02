<?php declare(strict_types=1);

namespace App\Http\Controllers\Page\Login;

use App\Enums\Common\ErrorCode;
use App\Http\Controllers\Controller;
use App\Service\Login\LoginCallbackService;
use Exception;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\RedirectResponse;

class LoginCallbackController extends Controller
{
    private LoginCallbackService $loginService;

    /**
     * @param LoginCallbackService $loginService
     */
    public function __construct(LoginCallbackService $loginService)
    {
        $this->loginService = $loginService;
    }

    /**
     * ログイン処理を実行する
     * @return RedirectResponse|Response
     */
    public function __invoke(): RedirectResponse|Response
    {
        try {
            DB::transaction(function () {
                $this->loginService->handle();
            });

        } catch (Exception $e) {
            return Inertia::render(
                'Error/ErrorIndex',
                $this->getError(ErrorCode::LO0101, $e),
            );
        }

        return redirect()->route('home');
    }
}
