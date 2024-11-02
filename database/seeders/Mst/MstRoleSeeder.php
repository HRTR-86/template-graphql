<?php declare(strict_types=1);

namespace Database\Seeders\Mst;

use App\Models\Mst\MstRole;
use Exception;
use Illuminate\Database\Seeder;

class MstRoleSeeder extends Seeder
{
    /**
     * @throws Exception
     */
    public function run(): void
    {
        if (config('app.env') !== 'local') {
            $this->command->info('Local環境以外では初期化用Seederは実行できません');

            return;
        }

        MstRole::factory()->create([
            'id'   => 1,
            'name' => '管理者',
        ]);

        MstRole::factory()->create([
            'id'   => 2,
            'name' => '開発者',
        ]);

        MstRole::factory()->create([
            'id'   => 3,
            'name' => '一般ユーザー',
        ]);
    }
}
