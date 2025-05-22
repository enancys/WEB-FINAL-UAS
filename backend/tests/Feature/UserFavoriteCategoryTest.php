<?php

namespace Tests\Feature;

use App\Models\UserFavoriteCategory;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class UserFavoriteCategoryTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    public function test_index_data() {
        $response = $this->get('/user_favorite_categories');
        $response->assertStatus(200);
    }

    public function test_store_data() {
        $userFavoriteCategory = UserFavoriteCategory::factory()->create();
        $response = $this->post('/user_favorite_categories', $userFavoriteCategory->toArray());
        $response->assertStatus(302);
        $this->assertDatabaseHas('user_favorite_categories', $userFavoriteCategory->toArray());
        $userFavoriteCategory->delete();
    }
    public function test_edit_data() {
        $userFavoriteCategory = UserFavoriteCategory::factory()->create();
        $response = $this->get("/user_favorite_categories/{$userFavoriteCategory->id}/edit");
        $response->assertStatus(200);
        $userFavoriteCategory->delete();
    }
    public function test_update_data() {
        $userFavoriteCategory = UserFavoriteCategory::factory()->create();

        $updatedUserFavoriteCategory = [
            'user_preference_id' => $userFavoriteCategory->user_preference_id,
            'category_id' => $userFavoriteCategory->category_id,
        ];

        $response = $this->put("/user_favorite_categories/{$userFavoriteCategory->id}", $updatedUserFavoriteCategory );
        $response->assertStatus(302);
        $this->assertDatabaseHas('user_favorite_categories', $updatedUserFavoriteCategory);
        $userFavoriteCategory->delete();
    }

    public function test_destroy_data() {
        $userFavoriteCategory = UserFavoriteCategory::factory()->create();
        $response = $this->delete("/user_favorite_categories/{$userFavoriteCategory->id}");
        $response->assertStatus(302);
        $this->assertDatabaseMissing('user_favorite_categories', ['id' => $userFavoriteCategory->id]);
        $userFavoriteCategory->delete();
    }
}
