<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\CategoryFood;
use App\Models\Food;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\CategoryFood>
 */
class CategoryFoodFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'category_id' => Category::factory()->create()->id,
            'food_id' => Food::factory()->create()->id
        ];
    }
}
