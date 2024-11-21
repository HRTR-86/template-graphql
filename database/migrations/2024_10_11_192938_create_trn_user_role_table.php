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
        Schema::create('trn_user_role', function (Blueprint $table) {
            $table->id()->comment('ID');

            $table->unsignedBigInteger('user_id')
                ->nullable()
                ->comment('ユーザーID');

            $table->unsignedInteger('role_id')
                ->nullable()
                ->comment('ロールID');

            $table->boolean('is_current')
                ->nullable(false)
                ->default(false)
                ->comment('現在の権限かどうか');

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

            $table->foreign('user_id')
                ->references('id')
                ->on('trn_user');

            $table->foreign('role_id')
                ->references('id')
                ->on('mst_role');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('trn_user_role');
    }
};
