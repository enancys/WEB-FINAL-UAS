<?php

namespace Tests\Feature;

use App\Models\Restaurant;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class RestaurantTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    public function test_index_data() {
        $response = $this->get('/restaurants');
        $response->assertStatus(200);
    }

    public function test_store_data() {
        $restaurant = Restaurant::factory()->make();
        $response = $this->post('/restaurants', $restaurant->toArray());
        $response->assertStatus(302);
        $this->assertDatabaseHas('restaurants', $restaurant->toArray());
        $restaurant->delete();
    }
    public function test_edit_data() {
        $restaurant = Restaurant::factory()->create();
        $response = $this->get("/restaurants/{$restaurant->id}/edit");
        $response->assertStatus(200);
        $restaurant->delete();
    }
    public function test_update_data() {
        $restaurant = Restaurant::factory()->create();
        $updatedRestaurant = [
            'name'  => $restaurant->name,
            'location' => $restaurant->location,
            'phone' => $restaurant->phone,
            'website_url' => $restaurant->website_url,
            'opening_hours' => $restaurant->opening_hours,
            'cuisine_id' => $restaurant->cuisine_id,
            'rating' => $restaurant->rating,
            'description' => $restaurant->description,
            'image_url' => $restaurant->image_url

        ];

        $response = $this->put("/restaurants/{$restaurant->id}", $updatedRestaurant );
        $response->assertStatus(302);
        $this->assertDatabaseHas('restaurants', $updatedRestaurant);
        $restaurant->delete();
    }

    public function test_destroy_data() {
        $restaurant = Restaurant::factory()->create();
        $response = $this->delete("/restaurants/{$restaurant->id}");
        $response->assertStatus(302);
        $this->assertDatabaseMissing('restaurants', ['id' => $restaurant->id]);
        $restaurant->delete();
    }
}
