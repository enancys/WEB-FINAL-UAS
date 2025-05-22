<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Ingredient>
 */
class IngredientFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $ingredients = [
            'Tepung Terigu',
            'Gula Pasir',
            'Garam',
            'Minyak Goreng',
            'Telur',
            'Air',
            'Susu Cair',
            'Mentega',
            'Bawang Putih',
            'Bawang Merah',
            'Cabe Merah',
            'Cabe Rawit',
            'Kecap Manis',
            'Saus Tomat',
            'Saus Sambal',
            'Kaldu Ayam',
            'Daging Ayam',
            'Daging Sapi',
            'Ikan Teri',
            'Udang',
            'Tahu',
            'Tempe',
            'Wortel',
            'Kentang',
            'Kol',
            'Daun Bawang',
            'Seledri',
            'Kecap Asin',
            'Santan',
            'Keju',
        ];

        return [
            'name' => $this->faker->randomElement($ingredients)
        ];
    }
}
