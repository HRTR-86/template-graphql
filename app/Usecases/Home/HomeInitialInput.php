<?php declare(strict_types=1);

namespace App\Usecases\Home;

use App\Usecases\InputBase;

class HomeInitialInput extends InputBase
{
    public int $operationUserId;

    /**
     * @param int $operationUserId
     */
    public function __construct(int $operationUserId)
    {
        $this->operationUserId = $operationUserId;
    }
}
