<?php declare(strict_types=1);

namespace App\GraphQL\Mutations\Profile;

use App\Service\Profile\ProfileEditService;
use App\Usecases\Profile\ProfileEditInput;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

readonly class ProfileEditMutation
{
    /**
     * @param ProfileEditService $profileEditService
     */
    public function __construct(
        private ProfileEditService $profileEditService,
    ) {}

    /**
     * @return array
     * @throws Exception
     */
    public function __invoke($_, $args): array
    {
        if (! Auth::check()) {
            throw new Exception('未認証のためアクセスできません');
        }

        $parameters = array_merge($args);
        $input      = new ProfileEditInput($parameters, Auth::id());
        DB::transaction(function () use ($input) {
            return $this->profileEditService->handle($input);
        });

        return [
            'status' => 200,
        ];
    }
}
