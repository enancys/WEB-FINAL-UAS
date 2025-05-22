<?php

namespace Database\Factories;

use App\Models\Food;
use App\Models\Ingredient;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\FoodIngredient>
 */
class FoodIngredientFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $units = ['grams', 'ml', 'tbsp', 'tsp', 'pieces', 'cups', 'slices'];

        return [
            'food_id' => Food::factory(),
            'ingredient_id' => Ingredient::factory(),
            'quantity' => $this->faker->randomFloat(2, 1, 100),
            'unit' => $this->faker->randomElement($units)

        ];
    }
}
