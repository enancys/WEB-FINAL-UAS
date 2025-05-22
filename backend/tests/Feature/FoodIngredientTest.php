<?php

namespace Tests\Feature;

use App\Models\FoodIngredient;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class FoodIngredientTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    public function test_index_data() {
        $response = $this->get('/food_ingredients');
        $response->assertStatus(200);
    }

    public function test_store_data() {
        $foodIngredient = FoodIngredient::factory()->create();
        $response = $this->post('/food_ingredients', $foodIngredient->toArray());
        $response->assertStatus(302);
        $this->assertDatabaseHas('food_ingredients', $foodIngredient->toArray());
        $foodIngredient->delete();
    }
    public function test_edit_data() {
        $foodIngredient = FoodIngredient::factory()->create();
        $response = $this->get("/food_ingredients/{$foodIngredient->id}/edit");
        $response->assertStatus(200);
        $foodIngredient->delete();
    }
    public function test_update_data() {
        $foodIngredient = FoodIngredient::factory()->create();

        $updatedFoodIngredient = [
            'ingredient_id' => $foodIngredient->ingredient_id,
            'food_id' => $foodIngredient->food_id,
            'quantity' => $foodIngredient->quantity,
            'unit' => $foodIngredient->unit 
        ];

        $response = $this->put("/food_ingredients/{$foodIngredient->id}", $updatedFoodIngredient );
        $response->assertStatus(302);
        $this->assertDatabaseHas('food_ingredients', $updatedFoodIngredient);
        $foodIngredient->delete();
    }

    public function test_destroy_data() {
        $foodIngredient = FoodIngredient::factory()->create();
        $response = $this->delete("/food_ingredients/{$foodIngredient->id}");
        $response->assertStatus(302);
        $this->assertDatabaseMissing('food_ingredients', ['id' => $foodIngredient->id]);
        $foodIngredient->delete();
    }
}
