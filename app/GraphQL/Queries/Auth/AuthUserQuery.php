<?php declare(strict_types=1);

namespace App\GraphQL\Queries\Auth;

use App\Service\Auth\AuthUserService;

readonly class AuthUserQuery
{
    /**
     * @param AuthUserService $authUserService
     */
    public function __construct(
        private AuthUserService $authUserService,
    ) {}

    /**
     * @return array
     */
    public function __invoke(): array
    {
        $output = $this->authUserService->handle();

        return $output->getOutput();
    }
}
