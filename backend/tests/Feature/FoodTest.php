<?php

namespace Tests\Feature;

use App\Models\Food;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class FoodTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    public function test_index_data() {
        $response = $this->get('/foods');
        $response->assertStatus(200);
    }

    public function test_store_data() {
        $food = Food::factory()->make();
        $response = $this->post('/foods', $food->toArray());
        $response->assertStatus(302);
        $this->assertDatabaseHas('foods', $food->toArray());
        $food->delete();
    }
    public function test_edit_data() {
        $food = Food::factory()->create();
        $response = $this->get("/foods/{$food->id}/edit");
        $response->assertStatus(200);
        $food->delete();
    }
    public function test_update_data() {
        $food = Food::factory()->create();
        $updatedFood = [
            'name'  => 'Nama Food',
            'description' => 'Deskripsi Food',
            'price' => 10000,
            'image_url' => 'Image Url Food',
            'restaurant_id' => $food->restaurant_id,
            'cuisine_id' => $food->cuisine_id
        ];

        $response = $this->put("/foods/{$food->id}", $updatedFood );
        $response->assertStatus(302);
        $this->assertDatabaseHas('foods', $updatedFood);
        $food->delete();
    }

    public function test_destroy_data() {
        $food = Food::factory()->create();
        $response = $this->delete("/foods/{$food->id}");
        $response->assertStatus(302);
        $this->assertDatabaseMissing('foods', ['id' => $food->id]);
        $food->delete();
    }
}
