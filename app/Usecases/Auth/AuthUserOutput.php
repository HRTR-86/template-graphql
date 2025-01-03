<?php declare(strict_types=1);

namespace App\Usecases\Auth;

readonly class AuthUserOutput
{
    /**
     * @param array $authUser
     * @param array $permissionList
     */
    public function __construct(
        private array $authUser,
        private array $permissionList
    ) {}

    /**
     * @return array
     */
    public function getOutput(): array
    {
        return [
            'auth_user'       => $this->authUser,
            'permission_list' => $this->permissionList,
        ];
    }
}
