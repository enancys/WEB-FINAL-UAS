<?php

namespace Tests\Feature;

use App\Models\IngredientRestriction;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class IngredientRestrictionTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    public function test_index_data() {
        $response = $this->get('/ingredient_restrictions');
        $response->assertStatus(200);
    }

    public function test_store_data() {
        $ingredientRestriction = IngredientRestriction::factory()->create();
        $response = $this->post('/ingredient_restrictions', $ingredientRestriction->toArray());
        $response->assertStatus(302);
        $this->assertDatabaseHas('ingredient_restrictions', $ingredientRestriction->toArray());
        $ingredientRestriction->delete();
    }
    public function test_edit_data() {
        $ingredientRestriction = ingredientRestriction::factory()->create();
        $response = $this->get("/ingredient_restrictions/{$ingredientRestriction->id}/edit");
        $response->assertStatus(200);
        $ingredientRestriction->delete();
    }
    public function test_update_data() {
        $ingredientRestriction = ingredientRestriction::factory()->create();

        $updatedIngredientRestriction = [
            'ingredient_id' => $ingredientRestriction->ingredient_id,
            'restriction_id' => $ingredientRestriction->restriction_id,
        ];

        $response = $this->put("/ingredient_restrictions/{$ingredientRestriction->id}", $updatedIngredientRestriction );
        $response->assertStatus(302);
        $this->assertDatabaseHas('ingredient_restrictions', $updatedIngredientRestriction);
        $ingredientRestriction->delete();
    }

    public function test_destroy_data() {
        $ingredientRestriction = ingredientRestriction::factory()->create();
        $response = $this->delete("/ingredient_restrictions/{$ingredientRestriction->id}");
        $response->assertStatus(302);
        $this->assertDatabaseMissing('ingredient_restrictions', ['id' => $ingredientRestriction->id]);
        $ingredientRestriction->delete();
    }
}
