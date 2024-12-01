<?php declare(strict_types=1);

namespace App\Http\Controllers\Page\Login;

use App\Enums\Common\ErrorCode;
use App\Http\Controllers\Controller;
use App\Http\Requests\Login\SignUpRequest;
use App\Service\Login\SignUpService;
use App\Usecases\Login\SignUpInput;
use Exception;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Throwable;

class SignUpController extends Controller
{
    /**
     * @param SignUpService $signUpService
     */
    public function __construct(
        private readonly SignUpService $signUpService,
    ) {}

    /**
     * @param SignUpRequest $request
     * @return RedirectResponse|Response
     * @throws Throwable
     */
    public function __invoke(SignUpRequest $request): RedirectResponse|Response
    {
        try {
            $parameters = array_merge($request->all(), $request->route()->parameters());
            $input      = new SignUpInput($parameters);
            $this->signUpService->handle($input);

            return Inertia::render(
                'Home/HomeIndex',
            );

        } catch (Exception $e) {
            return back()->withErrors(
                $this->getError(ErrorCode::LO1001, $e)
            );
        }
    }
}
