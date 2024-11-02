<?php declare(strict_types=1);

namespace App\Http\Requests\SampleChild;

use Illuminate\Foundation\Http\FormRequest;

class SampleChildCreateRequest extends FormRequest
{
    /**
     * @return bool
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * バリデーションのルールを指定する
     * @return array
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
        ];
    }

    /**
     * 項目名を設定する
     * @return array
     */
    public function attributes(): array
    {
        return [
            'name' => '子テーブルレコード名',
        ];
    }
}
