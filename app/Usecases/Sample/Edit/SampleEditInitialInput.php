<?php declare(strict_types=1);

namespace App\Usecases\Sample\Edit;

use App\Usecases\InputBase;

class SampleEditInitialInput extends InputBase
{
    public int $parentId;

    /**
     * @param array $input
     */
    public function __construct(array $input)
    {
        $this->parentId = $this->getIntTypeInput($input, 'parent_id');
    }
}
