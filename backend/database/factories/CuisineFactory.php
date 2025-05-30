<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Cuisine>
 */
class CuisineFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $cuisines = [
            'Italian',
            'Chinese',
            'Japanese',
            'Indian',
            'Mexican',
            'Thai',
            'Korean',
            'Indonesian',
            'French',
            'American',
        ];

        return [
            'name' => $this->faker->unique()->randomElement($cuisines),
            'description' => $this->faker->sentence()
        ];
    }
}
