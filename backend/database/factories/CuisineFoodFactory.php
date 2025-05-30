<?php

namespace Database\Factories;

use App\Models\Cuisine;
use App\Models\Food;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\CuisineFood>
 */
class CuisineFoodFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'food_id' => Food::factory(),
            'cuisine_id' => Cuisine::factory()
        ];
    }
}
