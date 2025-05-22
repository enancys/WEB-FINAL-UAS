<?php

namespace Database\Factories;

use App\Models\Cuisine;
use App\Models\Restaurant;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Food>
 */
class FoodFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->name(),
            'description' => $this->faker->sentence(),
            'price' => $this->faker->randomFloat(2, 5, 100),
            'image_url' => $this->faker->imageUrl(),
            'restaurant_id' => Restaurant::factory(),
            'cuisine_id' => Cuisine::factory()
        ];
    }
}
