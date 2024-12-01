<?php declare(strict_types=1);

namespace App\Enums\Common;

enum ErrorCode: string
{
    // ログイン
    case LO1001 = 'LO1001';
    case LO9901 = 'LO9901';
    case LO9902 = 'LO9902';
    case LO9903 = 'LO9903';
    case LO9904 = 'LO9904';
    case LO9905 = 'LO9905';

    // ホーム
    case HO1201 = 'HO1201';

    // プロフィール
    case PR0101 = 'PR0101';
    case PR1101 = 'PR1101';

    // サンプル
    case SA1001 = 'SA1001';
    case SA1002 = 'SA1002';
    case SA1003 = 'SA1003';
    case SA1101 = 'SA1101';

    // Mstデータ一覧
    case ML0201 = 'MS0201';
    case ML0202 = 'MS0202';

    /**
     * エラーメッセージを取得する
     * @return string
     */
    public function getErrorMessage(): string
    {
        return match ($this) {
            self::LO1001 => 'ユーザーの新規登録に失敗しました',
            self::LO9901,
            self::LO9902 => 'Google認証画面へのリダイレクトに失敗しました',
            self::LO9903,
            self::LO9904 => 'ログインに失敗しました',
            self::LO9905 => 'ログアウトに失敗しました',
            self::HO1201 => 'イベント情報の取得に失敗しました',
            self::PR0101 => 'プロフィールの取得に失敗しました',
            self::PR1101 => 'プロフィールの更新に失敗しました',
            self::SA1001 => '親テーブルデータの追加に失敗しました',
            self::SA1002,
            self::SA1003 => '子テーブルデータの追加に失敗しました',
            self::SA1101 => '親テーブルデータの更新に失敗しました',
            self::ML0201 => 'ロール一覧の取得に失敗しました',
            self::ML0202 => 'サンプルステータス一覧の取得に失敗しました',
        };
    }
}
