<?php

namespace Tests\Feature;

use App\Models\UserFavoriteIngredient;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class UserFavoriteIngredientTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    public function test_index_data() {
        $response = $this->get('/user_favorite_ingredients');
        $response->assertStatus(200);
    }

    public function test_store_data() {
        $userFavoriteIngredient = UserFavoriteIngredient::factory()->create();
        $response = $this->post('/user_favorite_ingredients', $userFavoriteIngredient->toArray());
        $response->assertStatus(302);
        $this->assertDatabaseHas('user_favorite_ingredients', $userFavoriteIngredient->toArray());
        $userFavoriteIngredient->delete();
    }
    public function test_edit_data() {
        $userFavoriteIngredient = UserFavoriteIngredient::factory()->create();
        $response = $this->get("/user_favorite_ingredients/{$userFavoriteIngredient->id}/edit");
        $response->assertStatus(200);
        $userFavoriteIngredient->delete();
    }
    public function test_update_data() {
        $userFavoriteIngredient = UserFavoriteIngredient::factory()->create();

        $updatedUserFavoriteIngredient = [
            'user_preference_id' => $userFavoriteIngredient->user_preference_id,
            'ingredient_id' => $userFavoriteIngredient->ingredient_id,
        ];

        $response = $this->put("/user_favorite_ingredients/{$userFavoriteIngredient->id}", $updatedUserFavoriteIngredient );
        $response->assertStatus(302);
        $this->assertDatabaseHas('user_favorite_ingredients', $updatedUserFavoriteIngredient);
        $userFavoriteIngredient->delete();
    }

    public function test_destroy_data() {
        $userFavoriteIngredient = UserFavoriteIngredient::factory()->create();
        $response = $this->delete("/user_favorite_ingredients/{$userFavoriteIngredient->id}");
        $response->assertStatus(302);
        $this->assertDatabaseMissing('user_favorite_ingredients', ['id' => $userFavoriteIngredient->id]);
        $userFavoriteIngredient->delete();
    }
}
