<?php

namespace Database\Factories;

use App\Models\Cuisine;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Restaurant>
 */
class RestaurantFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $openingHours = [
            '08:00 - 22:00',
            '09:00 - 21:00',
            '10:00 - 20:00',
            '24 Jam',
        ];
        return [
            'name' => $this->faker->company(),
            'location' => $this->faker->address(),
            'phone' => $this->faker->phoneNumber(),
            'website_url' => $this->faker->url(),
            'opening_hours' => $this->faker->randomElement($openingHours),
            'cuisine_id' => Cuisine::factory(),
            'rating' => $this->faker->randomFloat(2, 0, 9.99),
            'description' => $this->faker->sentence(),
            'image_url' => $this->faker->imageUrl()
        ];
    }
}
