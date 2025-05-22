<?php

namespace Tests\Feature;

use App\Models\Cuisine;
use App\Models\CuisineFood;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class CuisineFoodTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    public function test_index_data() {
        $response = $this->get('/cuisine_foods');
        $response->assertStatus(200);
    }

    public function test_store_data() {
        $cuisineFood = CuisineFood::factory()->create();
        $response = $this->post('/cuisine_foods', $cuisineFood->toArray());
        $response->assertStatus(302);
        $this->assertDatabaseHas('cuisine_food', $cuisineFood->toArray());
        $cuisineFood->delete();
    }
    public function test_edit_data() {
        $cuisineFood = CuisineFood::factory()->create();
        $response = $this->get("/cuisine_foods/{$cuisineFood->id}/edit");
        $response->assertStatus(200);
        $cuisineFood->delete();
    }
    public function test_update_data() {
        $cuisineFood = CuisineFood::factory()->create();
        $cuisine = Cuisine::factory()->create();

        $updatedCategoryFood = [
            'cuisine_id' => $cuisine->id,
            'food_id' => $cuisineFood->food_id
        ];

        $response = $this->put("/cuisine_foods/{$cuisineFood->id}", $updatedCategoryFood );
        $response->assertStatus(302);
        $this->assertDatabaseHas('cuisine_food', $updatedCategoryFood);
        $cuisineFood->delete();
    }

    public function test_destroy_data() {
        $cuisineFood = cuisineFood::factory()->create();
        $response = $this->delete("/cuisine_foods/{$cuisineFood->id}");
        $response->assertStatus(302);
        $this->assertDatabaseMissing('cuisine_food', ['id' => $cuisineFood->id]);
        $cuisineFood->delete();
    }
}
