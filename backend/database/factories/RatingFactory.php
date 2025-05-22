<?php

namespace Database\Factories;

use App\Models\Food;
use App\Models\Restaurant;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Rating>
 */
class RatingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'food_id' => Food::factory(),
            'restaurant_id' => Restaurant::factory(),
            'rating' => $this->faker->randomFloat(1, 1, 10),
            'review' => $this->faker->sentence(),
            'image_url' => $this->faker->imageUrl()
        ];
    }
}
