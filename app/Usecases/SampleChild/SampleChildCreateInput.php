<?php declare(strict_types=1);

namespace App\Usecases\SampleChild;

use App\Usecases\InputBase;
use Illuminate\Support\Collection;

class SampleChildCreateInput extends InputBase
{
    /** @var int */
    public int $parentId;

    /** @var Collection<ChildObject> */
    public Collection $childList;

    /** @var int */
    public int $operationUserId;

    /**
     * @param array $input
     * @param int $operationUserId
     */
    public function __construct(array $input, int $operationUserId)
    {
        $this->parentId        = $this->getIntTypeInput($input, 'parent_id');
        $this->childList       = ChildObject::getArrayTypeInput($input, 'child_list');
        $this->operationUserId = $operationUserId;
    }
}
