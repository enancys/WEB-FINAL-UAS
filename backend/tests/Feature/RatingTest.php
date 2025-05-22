<?php

namespace Tests\Feature;

use App\Models\Rating;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class RatingTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    public function test_index_data() {
        $response = $this->get('/ratings');
        $response->assertStatus(200);
    }

    public function test_store_data() {
        $rating = Rating::factory()->make();
        $response = $this->post('/ratings', $rating->toArray());
        $response->assertStatus(302);
        $this->assertDatabaseHas('ratings', $rating->toArray());
        $rating->delete();
    }
    public function test_edit_data() {
        $rating = Rating::factory()->create();
        $response = $this->get("/ratings/{$rating->id}/edit");
        $response->assertStatus(200);
        $rating->delete();
    }
    public function test_update_data() {
        $rating = Rating::factory()->create();
        $updatedFood = [
            'user_id'  => $rating->user_id,
            'food_id' => $rating->food_id,
            'restaurant_id' => $rating->restaurant_id,
            'rating' => $rating->rating,
            'review' => $rating->review,
            'image_url' => $rating->image_url
        ];

        $response = $this->put("/ratings/{$rating->id}", $updatedFood );
        $response->assertStatus(302);
        $this->assertDatabaseHas('ratings', $updatedFood);
        $rating->delete();
    }

    public function test_destroy_data() {
        $rating = Rating::factory()->create();
        $response = $this->delete("/ratings/{$rating->id}");
        $response->assertStatus(302);
        $this->assertDatabaseMissing('ratings', ['id' => $rating->id]);
        $rating->delete();
    }
}