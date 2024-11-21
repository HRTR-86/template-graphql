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
        Schema::create('mst_sample_status', function (Blueprint $table) {
            $table->increments('id')->primary()->comment('ID');

            $table->string('name', 255)
                ->nullable(false)
                ->default('')
                ->comment('ステータス名');

            $table->boolean('is_unique_target')
                ->virtualAs('IF(deleted_at IS NULL, 1, NULL)')
                ->comment('ユニーク制約の対象であるか');

            $table->datetime('created_at')
                ->nullable()
                ->comment('作成日時');

            $table->unsignedBigInteger('created_by')
                ->nullable(false)
                ->default(0)
                ->comment('作成者');

            $table->datetime('updated_at')
                ->nullable()
                ->comment('更新日時');

            $table->unsignedBigInteger('updated_by')
                ->nullable(false)
                ->default(0)
                ->comment('更新者');

            $table->datetime('deleted_at')
                ->nullable()
                ->comment('削除日時');

            $table->unique(['name', 'is_unique_target']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mst_sample_status');
    }
};
