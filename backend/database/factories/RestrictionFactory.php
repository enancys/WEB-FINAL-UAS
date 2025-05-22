<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Restriction>
 */
class RestrictionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $restrictions = [
            'Vegetarian',
            'Vegan',
            'Halal',
            'Kosher',
            'Gluten-Free',
            'Dairy-Free',
            'Nut-Free',
            'Egg-Free',
            'Soy-Free',
            'Seafood-Free',
            'Pork-Free',
            'Low-Sodium',
            'Low-Sugar',
            'Low-Carb',
            'No MSG',
            'Lactose Intolerant',
            'Peanut Allergy',
            'Shellfish Allergy',
            'Diabetic-Friendly',
            'Heart-Healthy',
        ];

        return [
            'name' => $this->faker->unique()->randomElement($restrictions)
        ];
    }
}
