<?php

namespace Database\Factories;

use App\Models\Ingredient;
use App\Models\Restriction;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\IngredientRestriction>
 */
class IngredientRestrictionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'ingredient_id' => Ingredient::factory(),
            'restriction_id' => Restriction::factory()
        ];
    }
}
