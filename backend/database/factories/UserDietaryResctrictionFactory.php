<?php

namespace Database\Factories;

use App\Models\Restriction;
use App\Models\UserPreference;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\UserDietaryResctriction>
 */
class UserDietaryResctrictionFactory extends Factory
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
            'restriction_id' => Restriction::factory()
        ];
    }
}
