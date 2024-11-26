<?php declare(strict_types=1);

namespace App\Usecases\SampleChild;

use App\Usecases\InputBase;
use Illuminate\Support\Collection;

class ChildObject extends InputBase
{
    public string $name;

    /**
     * @param array $input
     */
    public function __construct(array $input)
    {
        $this->name = $this->getStringTypeInput($input, 'name');
    }

    /**
     * @param array $input
     * @param string $index
     * @return Collection<ChildObject>
     */
    public static function getArrayTypeInput(array $input, string $index): Collection
    {
        if (! array_key_exists($index, $input)) {
            return collect();
        }

        $participantList = collect();
        foreach ($input[$index] as $participant) {
            $participantList->add(new ChildObject($participant));
        }

        return $participantList;
    }
}
