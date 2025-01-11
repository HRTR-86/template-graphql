<?php declare(strict_types=1);

namespace App\GraphQL\Queries\Profile;

use App\Service\Profile\ProfileInitialService;
use Exception;
use Illuminate\Support\Facades\Auth;

readonly class ProfileQuery
{
    /**
     * @param ProfileInitialService $profileInitialService
     */
    public function __construct(
        private ProfileInitialService $profileInitialService,
    ) {}

    /**
     * @return array
     * @throws Exception
     */
    public function __invoke(): array
    {
        if (! Auth::check()) {
            throw new Exception('未認証のためアクセスできません');
        }

        $output = $this->profileInitialService->handle();

        return $output->getOutput();
    }
}
