<?php declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('trn_user', function (Blueprint $table) {
            $table->id()->comment('ID');

            $table->string('name', 255)
                ->nullable(false)
                ->default('')
                ->comment('名前');

            $table->string('email', 255)
                ->nullable(false)
                ->default('')
                ->comment('メールアドレス');

            $table->string('password', 255)
                ->nullable(false)
                ->default('')
                ->comment('パスワード');

            $table->string('image_url', 255)
                ->nullable()
                ->default('')
                ->comment('プロフィール画像URL');

            $table->boolean('is_unique_target')
                ->virtualAs('IF(deleted_at IS NULL, 1, NULL)')
                ->comment('ユニーク制約の対象であるか');

            $table->datetime('created_at')
                ->nullable(false)
                ->default(DB::raw('CURRENT_TIMESTAMP'))
                ->comment('作成日時');

            $table->unsignedBigInteger('created_by')
                ->nullable(false)
                ->default(0)
                ->comment('作成者');

            $table->datetime('updated_at')
                ->nullable(false)
                ->default(DB::raw('CURRENT_TIMESTAMP'))
                ->comment('更新日時');

            $table->unsignedBigInteger('updated_by')
                ->nullable(false)
                ->default(0)
                ->comment('更新者');

            $table->datetime('deleted_at')
                ->nullable()
                ->comment('削除日時');

            $table->unique(['email', 'is_unique_target']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('trn_user');
    }
};
