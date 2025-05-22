<?php

namespace Tests\Feature;

use App\Models\FoodTag;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class FoodTagTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    public function test_index_data() {
        $response = $this->get('/food_tags');
        $response->assertStatus(200);
    }

    public function test_store_data() {
        $foodTag = FoodTag::factory()->create();
        $response = $this->post('/food_tags', $foodTag->toArray());
        $response->assertStatus(302);
        $this->assertDatabaseHas('food_tags', $foodTag->toArray());
        $foodTag->delete();
    }
    public function test_edit_data() {
        $foodTag = FoodTag::factory()->create();
        $response = $this->get("/food_tags/{$foodTag->id}/edit");
        $response->assertStatus(200);
        $foodTag->delete();
    }
    public function test_update_data() {
        $foodTag = FoodTag::factory()->create();

        $updatedFoodTag = [
            'tag_id' => $foodTag->tag_id,
            'food_id' => $foodTag->food_id
        ];

        $response = $this->put("/food_tags/{$foodTag->id}", $updatedFoodTag );
        $response->assertStatus(302);
        $this->assertDatabaseHas('food_tags', $updatedFoodTag);
        $foodTag->delete();
    }

    public function test_destroy_data() {
        $foodTag = FoodTag::factory()->create();
        $response = $this->delete("/food_tags/{$foodTag->id}");
        $response->assertStatus(302);
        $this->assertDatabaseMissing('food_tags', ['id' => $foodTag->id]);
        $foodTag->delete();
    }
}
