<?php declare(strict_types=1);

namespace App\Usecases;

use Carbon\Carbon;
use Illuminate\Support\Arr;
use Illuminate\Support\Collection;

class InputBase
{
    /**
     * int型のパラメーターを取得する
     * @param array $input
     * @param string $index
     * @return int
     */
    public function getIntTypeInput(array $input, string $index): int
    {
        return (int) Arr::get($input, $index, 0);
    }

    /**
     * string型のパラメーターを取得する
     * @param array $input
     * @param string $index
     * @return string
     */
    public function getStringTypeInput(array $input, string $index): string
    {
        return (string) Arr::get($input, $index, '');
    }

    /**
     * bool型のパラメーターを取得する
     * @param array $input
     * @param string $index
     * @return bool
     */
    public function getBoolTypeInput(array $input, string $index): bool
    {
        return (bool) Arr::get($input, $index, false);
    }

    /**
     * 日付型のパラメーターを取得する
     * @param array $input
     * @param string $index
     * @return Carbon|null
     */
    public function getDateTypeInput(array $input, string $index): ?Carbon
    {
        $inputValue = Arr::get($input, $index);

        return $inputValue ? new Carbon($inputValue) : null;
    }

    /**
     * 配列（数値）型のパラメーターを取得する
     * @param array $input
     * @param string $index
     * @return Collection
     */
    public function getIntArrayTypeInput(array $input, string $index): Collection
    {
        $inputValueList = Arr::get($input, $index, []);

        return collect(array_map('intval', $inputValueList));
    }
}
