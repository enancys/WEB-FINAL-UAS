<?php

namespace Tests\Feature;

use App\Models\RestaurantFood;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class RestaurantFoodTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    public function test_index_data() {
        $response = $this->get('/restaurant_foods');
        $response->assertStatus(200);
    }

    public function test_store_data() {
        $restaurantFood = RestaurantFood::factory()->create();
        $response = $this->post('/restaurant_foods', $restaurantFood->toArray());
        $response->assertStatus(302);
        $this->assertDatabaseHas('restaurant_foods', $restaurantFood->toArray());
        $restaurantFood->delete();
    }
    public function test_edit_data() {
        $restaurantFood = RestaurantFood::factory()->create();
        $response = $this->get("/restaurant_foods/{$restaurantFood->id}/edit");
        $response->assertStatus(200);
        $restaurantFood->delete();
    }
    public function test_update_data() {
        $restaurantFood = RestaurantFood::factory()->create();

        $updatedRestaurant = [
            'restaurant_id' => $restaurantFood->restaurant_id,
            'food_id' => $restaurantFood->food_id,
            'price' => $restaurantFood->price
        ];

        $response = $this->put("/restaurant_foods/{$restaurantFood->id}", $updatedRestaurant );
        $response->assertStatus(302);
        $this->assertDatabaseHas('restaurant_foods', $updatedRestaurant);
        $restaurantFood->delete();
    }

    public function test_destroy_data() {
        $restaurantFood = RestaurantFood::factory()->create();
        $response = $this->delete("/restaurant_foods/{$restaurantFood->id}");
        $response->assertStatus(302);
        $this->assertDatabaseMissing('restaurant_foods', ['id' => $restaurantFood->id]);
        $restaurantFood->delete();
    }
}
