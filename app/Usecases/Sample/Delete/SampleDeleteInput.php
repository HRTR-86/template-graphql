<?php declare(strict_types=1);

namespace App\Usecases\Sample\Delete;

use App\Usecases\InputBase;

class SampleDeleteInput extends InputBase
{
    public int $parentId;

    public int $operationUserId;

    /**
     * @param array $input
     * @param int $operationUserId
     */
    public function __construct(array $input, int $operationUserId)
    {
        $this->parentId        = $this->getIntTypeInput($input, 'parent_id');
        $this->operationUserId = $operationUserId;
    }
}
