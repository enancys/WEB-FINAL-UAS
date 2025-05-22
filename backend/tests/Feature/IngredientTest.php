<?php

namespace Tests\Feature;

use App\Models\Ingredient;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class IngredientTest extends TestCase
{
    /**
     * A basic feature test example.
*/    
    public function test_index_data() {
        $response = $this->get('/ingredients');
        $response->assertStatus(200);
    }

    public function test_store_data() {
        $ingredient = Ingredient::factory()->create();
        $response = $this->post('/ingredients', $ingredient->toArray());
        $response->assertStatus(302);
        $this->assertDatabaseHas('ingredients', $ingredient->toArray());
        $ingredient->delete();
    }
    public function test_edit_data() {
        $ingredient = Ingredient::factory()->create();
        $response = $this->get("/ingredients/{$ingredient->id}/edit");
        $response->assertStatus(200);
        $ingredient->delete();
    }
    public function test_update_data() {
        $ingredient = Ingredient::factory()->create();

        $updatedFoodIngredient = [
            'name' => $ingredient->name,
        ];

        $response = $this->put("/ingredients/{$ingredient->id}", $updatedFoodIngredient );
        $response->assertStatus(302);
        $this->assertDatabaseHas('ingredients', $updatedFoodIngredient);
        $ingredient->delete();
    }

    public function test_destroy_data() {
        $ingredient = Ingredient::factory()->create();
        $response = $this->delete("/ingredients/{$ingredient->id}");
        $response->assertStatus(302);
        $this->assertDatabaseMissing('ingredients', ['id' => $ingredient->id]);
        $ingredient->delete();
    }
}
