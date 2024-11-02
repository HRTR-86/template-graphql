<?php declare(strict_types=1);

namespace Database\Factories\Trn;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class TrnUserFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'email'      => fake()->email(),
            'password'   => fake()->password(),
            'name'       => fake()->name(),
            'created_by' => 1,
            'updated_by' => 1,
        ];
    }
}
