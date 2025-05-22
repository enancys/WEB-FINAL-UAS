<?php

namespace Tests\Feature;

use App\Models\UserFavoriteCuisine;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class UserFavoriteCuisineTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    public function test_index_data() {
        $response = $this->get('/user_favorite_cuisines');
        $response->assertStatus(200);
    }

    public function test_store_data() {
        $userFavoriteCuisine = UserFavoriteCuisine::factory()->create();
        $response = $this->post('/user_favorite_cuisines', $userFavoriteCuisine->toArray());
        $response->assertStatus(302);
        $this->assertDatabaseHas('user_favorite_cuisines', $userFavoriteCuisine->toArray());
        $userFavoriteCuisine->delete();
    }
    public function test_edit_data() {
        $userFavoriteCuisine = UserFavoriteCuisine::factory()->create();
        $response = $this->get("/user_favorite_cuisines/{$userFavoriteCuisine->id}/edit");
        $response->assertStatus(200);
        $userFavoriteCuisine->delete();
    }
    public function test_update_data() {
        $userFavoriteCuisine = UserFavoriteCuisine::factory()->create();

        $updatedUserFavoriteCuisine = [
            'user_preference_id' => $userFavoriteCuisine->user_preference_id,
            'cuisine_id' => $userFavoriteCuisine->cuisine_id,
        ];

        $response = $this->put("/user_favorite_cuisines/{$userFavoriteCuisine->id}", $updatedUserFavoriteCuisine );
        $response->assertStatus(302);
        $this->assertDatabaseHas('user_favorite_cuisines', $updatedUserFavoriteCuisine);
        $userFavoriteCuisine->delete();
    }

    public function test_destroy_data() {
        $userFavoriteCuisine = UserFavoriteCuisine::factory()->create();
        $response = $this->delete("/user_favorite_cuisines/{$userFavoriteCuisine->id}");
        $response->assertStatus(302);
        $this->assertDatabaseMissing('user_favorite_cuisines', ['id' => $userFavoriteCuisine->id]);
        $userFavoriteCuisine->delete();
    }
}
