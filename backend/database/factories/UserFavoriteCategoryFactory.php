<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\UserPreference;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\UserFavoriteCategory>
 */
class UserFavoriteCategoryFactory extends Factory
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
            'category_id' => Category::factory()
        ];
    }
}
