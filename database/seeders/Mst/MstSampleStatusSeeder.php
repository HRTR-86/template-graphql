<?php declare(strict_types=1);

namespace Database\Seeders\Mst;

use App\Models\Mst\MstSampleStatus;
use Exception;
use Illuminate\Database\Seeder;

class MstSampleStatusSeeder extends Seeder
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

        MstSampleStatus::factory()->create([
            'id'   => 1,
            'name' => '準備中',
        ]);

        MstSampleStatus::factory()->create([
            'id'   => 2,
            'name' => '開催中',
        ]);

        MstSampleStatus::factory()->create([
            'id'   => 3,
            'name' => '完了',
        ]);
    }
}
