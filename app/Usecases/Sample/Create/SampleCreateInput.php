<?php declare(strict_types=1);

namespace App\Usecases\Sample\Create;

use App\Usecases\InputBase;
use Carbon\Carbon;
use Illuminate\Support\Collection;

class SampleCreateInput extends InputBase
{
    public string $parentName;

    public int $statusId;

    public ?Carbon $datetime;

    public Collection $childIdList;

    public int $operationUserId;

    /**
     * @param array $input
     * @param int $operationUserId
     */
    public function __construct(array $input, int $operationUserId)
    {
        $this->parentName      = $this->getStringTypeInput($input, 'parent_name');
        $this->datetime        = $this->getDateTypeInput($input, 'datetime');
        $this->statusId        = $this->getIntTypeInput($input, 'status_id');
        $this->childIdList     = $this->getIntArrayTypeInput($input, 'child_id_list');
        $this->operationUserId = $operationUserId;
    }
}
