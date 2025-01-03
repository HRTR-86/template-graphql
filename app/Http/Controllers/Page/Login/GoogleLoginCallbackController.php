<?php declare(strict_types=1);

namespace App\Http\Controllers\Page\Login;

use App\Http\Controllers\Controller;
use App\Service\Login\GoogleLoginService;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Throwable;

class GoogleLoginCallbackController extends Controller
{
    /**
     * @param GoogleLoginService $googleLoginService
     */
    public function __construct(private readonly GoogleLoginService $googleLoginService) {}

    /**
     * ログイン処理を実行する
     * @return RedirectResponse
     * @throws Throwable
     */
    public function __invoke(): RedirectResponse
    {
        DB::transaction(function () {
            $this->googleLoginService->handle();
        });

        return redirect('/home');
    }
}
