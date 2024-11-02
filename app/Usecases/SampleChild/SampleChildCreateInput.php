<?php declare(strict_types=1);

namespace App\Usecases\SampleChild;

use App\Usecases\InputBase;

class SampleChildCreateInput extends InputBase
{
    /** @var int */
    public int $parentId;

    /** @var string */
    public string $name;

    /** @var int */
    public int $operationUserId;

    /**
     * @param array $input
     * @param int $operationUserId
     */
    public function __construct(array $input, int $operationUserId)
    {
        $this->parentId        = $this->getIntTypeInput($input, 'parent_id');
        $this->name            = $this->getStringTypeInput($input, 'name');
        $this->operationUserId = $operationUserId;
    }
}
