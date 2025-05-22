<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Tag>
 */
class TagFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $tags = [
            'Spicy',
            'Sweet',
            'Sour',
            'Salty',
            'Bitter',
            'Umami',
            'Crunchy',
            'Savory',
            'Fresh',
            'Grilled',
            'Fried',
            'Steamed',
            'Baked',
            'Healthy',
            'Vegetarian',
            'Vegan',
            'Gluten-Free',
            'Quick Meal',
            'Low-Calorie',
            'Traditional',
            'Street Food',
            'Fusion',
            'Exotic',
            'Comfort Food',
            'Budget Friendly',
        ];

        return [
            'name' => $this->faker->unique()->randomElement($tags)
        ];
    }
}
