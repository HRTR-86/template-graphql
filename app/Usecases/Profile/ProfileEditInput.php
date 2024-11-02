<?php declare(strict_types=1);

namespace App\Usecases\Profile;

use App\Usecases\InputBase;

class ProfileEditInput extends InputBase
{
    public string $userName;

    public int $roleId;

    public int $operationUserId;

    /**
     * @param array $input
     * @param int $operationUserId
     */
    public function __construct(array $input, int $operationUserId)
    {
        $this->userName        = $this->getStringTypeInput($input, 'user_name');
        $this->roleId          = $this->getIntTypeInput($input, 'role_id');
        $this->operationUserId = $operationUserId;
    }
}
