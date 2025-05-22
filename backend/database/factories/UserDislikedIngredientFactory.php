<?php

namespace Database\Factories;

use App\Models\Ingredient;
use App\Models\UserPreference;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\UserDislikedIngredient>
 */
class UserDislikedIngredientFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_preference_id' => UserPreference::factory(),
            'ingredient_id' => Ingredient::factory()
        ];
    }
}
