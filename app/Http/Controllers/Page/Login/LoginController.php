<?php declare(strict_types=1);

namespace App\Http\Controllers\Page\Login;

use App\Http\Controllers\Controller;
use App\Http\Requests\Login\LoginRequest;
use App\Service\Login\LoginService;
use App\Usecases\Login\LoginInput;
use Illuminate\Validation\ValidationException;
use Inertia\Response;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Throwable;

class LoginController extends Controller
{
    /**
     * @param LoginService $loginService
     */
    public function __construct(
        private readonly LoginService $loginService,
    ) {}

    /**
     * @param LoginRequest $request
     * @return RedirectResponse|Response
     * @throws ValidationException
     * @throws Throwable
     */
    public function __invoke(LoginRequest $request): RedirectResponse|Response
    {
        $parameters = array_merge($request->all(), $request->route()->parameters());
        $input      = new LoginInput($parameters);
        $this->loginService->handle($input);

        return redirect('/home');
    }
}
