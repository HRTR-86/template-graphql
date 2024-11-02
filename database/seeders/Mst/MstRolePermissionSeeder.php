<?php declare(strict_types=1);

namespace Database\Seeders\Mst;

use App\Models\Mst\MstRolePermission;
use Illuminate\Database\Seeder;

class MstRolePermissionSeeder extends Seeder
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

        /**
         * 管理者（role_id:1）
         */
        MstRolePermission::factory()->create([
            'role_id'       => 1,
            'permission_id' => 1,
        ]);

        MstRolePermission::factory()->create([
            'role_id'       => 1,
            'permission_id' => 2,
        ]);

        MstRolePermission::factory()->create([
            'role_id'       => 1,
            'permission_id' => 3,
        ]);

        MstRolePermission::factory()->create([
            'role_id'       => 1,
            'permission_id' => 4,
        ]);

        MstRolePermission::factory()->create([
            'role_id'       => 1,
            'permission_id' => 5,
        ]);

        MstRolePermission::factory()->create([
            'role_id'       => 1,
            'permission_id' => 6,
        ]);

        /**
         * 開発者（role_id:2）
         */
        MstRolePermission::factory()->create([
            'role_id'       => 2,
            'permission_id' => 2,
        ]);

        MstRolePermission::factory()->create([
            'role_id'       => 2,
            'permission_id' => 3,
        ]);

        MstRolePermission::factory()->create([
            'role_id'       => 2,
            'permission_id' => 4,
        ]);

        MstRolePermission::factory()->create([
            'role_id'       => 2,
            'permission_id' => 5,
        ]);

        MstRolePermission::factory()->create([
            'role_id'       => 2,
            'permission_id' => 6,
        ]);

        /**
         * 一般ユーザー（role_id:3）
         */
        MstRolePermission::factory()->create([
            'role_id'       => 3,
            'permission_id' => 3,
        ]);

        MstRolePermission::factory()->create([
            'role_id'       => 3,
            'permission_id' => 4,
        ]);

        MstRolePermission::factory()->create([
            'role_id'       => 3,
            'permission_id' => 5,
        ]);
    }
}
