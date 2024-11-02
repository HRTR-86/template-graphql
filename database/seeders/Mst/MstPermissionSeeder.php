<?php declare(strict_types=1);

namespace Database\Seeders\Mst;

use App\Models\Mst\MstPermission;
use Illuminate\Database\Seeder;

class MstPermissionSeeder extends Seeder
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

        MstPermission::factory()->create([
            'id'   => 1,
            'name' => '管理画面の閲覧',
        ]);

        MstPermission::factory()->create([
            'id'   => 2,
            'name' => '開発者用画面の閲覧',
        ]);

        MstPermission::factory()->create([
            'id'   => 3,
            'name' => '親サンプルデータの閲覧',
        ]);

        MstPermission::factory()->create([
            'id'   => 4,
            'name' => '親・子サンプルデータの登録',
        ]);

        MstPermission::factory()->create([
            'id'   => 5,
            'name' => '親・子サンプルデータの編集',
        ]);

        MstPermission::factory()->create([
            'id'   => 6,
            'name' => '親・子サンプルデータの削除',
        ]);
    }
}
