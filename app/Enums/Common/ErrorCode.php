<?php declare(strict_types=1);

namespace App\Enums\Common;

enum ErrorCode: string
{
    // ログイン
    case LO0101 = 'LO0101';
    case LO9901 = 'LO9901';
    case LO9902 = 'LO9902';

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
            self::LO0101 => 'ログインに失敗しました',
            self::LO9901 => 'ログインページの取得に失敗しました',
            self::LO9902 => 'ログアウトに失敗しました',
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
