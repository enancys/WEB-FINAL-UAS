<?php

namespace Database\Factories;

use App\Models\Food;
use App\Models\Restaurant;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\RestaurantFood>
 */
class RestaurantFoodFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'restaurant_id' => Restaurant::factory(),
            'food_id' => Food::factory(),
            'price' => $this->faker->randomFloat(2, 5,100)
        ];
    }
}
