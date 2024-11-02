<?php declare(strict_types=1);

namespace App\Http\Requests\Sample;

use Illuminate\Foundation\Http\FormRequest;

class SampleEditRequest extends FormRequest
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
            'parent_id'       => ['required', 'integer'],
            'parent_name'     => ['required', 'string', 'max:100'],
            'status_id'       => ['nullable', 'integer'],
            'datetime'        => ['nullable', 'date'],
            'child_id_list.*' => ['nullable', 'integer'],
        ];
    }

    /**
     * 項目名を設定する
     * @return array
     */
    public function attributes(): array
    {
        return [
            'parent_id'       => '親テーブルID',
            'parent_name'     => '親テーブルレコード名',
            'status_id'       => 'ステータスID',
            'datetime'        => '日時',
            'child_id_list.*' => '子テーブルID',
        ];
    }
}
