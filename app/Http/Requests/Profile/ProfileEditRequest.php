<?php declare(strict_types=1);

namespace App\Http\Requests\Profile;

use Illuminate\Foundation\Http\FormRequest;

class ProfileEditRequest extends FormRequest
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
            'user_name' => ['required', 'string', 'max:255'],
            'role_id'   => ['required', 'integer', 'not_in:0'],
        ];
    }

    /**
     * 項目名を設定する
     * @return array
     */
    public function attributes(): array
    {
        return [
            'user_name' => '氏名',
            'role_id'   => '権限',
        ];
    }

    /**
     * バリデーションエラーメッセージを設定する
     * @return array
     */
    public function messages(): array
    {
        return [
            'role_id.not_in' => ':attributeを選択してください。',
        ];
    }
}
