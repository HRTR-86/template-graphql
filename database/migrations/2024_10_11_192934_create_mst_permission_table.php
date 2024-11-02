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
        Schema::create('mst_permission', function (Blueprint $table) {
            $table->increments('id')->primary()->comment('ID');

            $table->string('name', 255)
                ->nullable(false)
                ->default('')
                ->comment('権限名');

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
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mst_permission');
    }
};
