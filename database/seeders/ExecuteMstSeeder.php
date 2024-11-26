<?php declare(strict_types=1);

namespace Database\Seeders;

use App\Models\Mst\MstPermission;
use App\Models\Mst\MstRole;
use App\Models\Mst\MstRolePermission;
use App\Models\Mst\MstSampleStatus;
use Database\Seeders\Mst\MstPermissionSeeder;
use Database\Seeders\Mst\MstRolePermissionSeeder;
use Database\Seeders\Mst\MstRoleSeeder;
use Database\Seeders\Mst\MstSampleStatusSeeder;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Schema;

/**
 * マスタデータ一括投入用Seeder
 * 実行コマンド：php artisan db:seed --class=ExecuteMstSeeder
 */
class ExecuteMstSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run(): void
    {
        if (config('app.env') !== 'local') {
            $this->command->info('Local環境以外では初期化用Seederは実行できません');

            return;
        }

        Schema::disableForeignKeyConstraints();

        MstPermission::truncate();
        MstRole::truncate();
        MstRolePermission::truncate();
        MstSampleStatus::truncate();

        $this->call([
            MstPermissionSeeder::class,
            MstRoleSeeder::class,
            MstRolePermissionSeeder::class,
            MstSampleStatusSeeder::class,
        ]);

        Schema::enableForeignKeyConstraints();
    }
}
