<?php

namespace Tests\Feature;

use App\Models\UserDislikedIngredient;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class UserDislikedIngredientTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    public function test_index_data() {
        $response = $this->get('/user_disliked_ingredients');
        $response->assertStatus(200);
    }

    public function test_store_data() {
        $userDislikedIngredient = UserDislikedIngredient::factory()->create();
        $response = $this->post('/user_disliked_ingredients', $userDislikedIngredient->toArray());
        $response->assertStatus(302);
        $this->assertDatabaseHas('user_disliked_ingredients', $userDislikedIngredient->toArray());
        $userDislikedIngredient->delete();
    }
    public function test_edit_data() {
        $userDislikedIngredient = UserDislikedIngredient::factory()->create();
        $response = $this->get("/user_disliked_ingredients/{$userDislikedIngredient->id}/edit");
        $response->assertStatus(200);
        $userDislikedIngredient->delete();
    }
    public function test_update_data() {
        $userDislikedIngredient = UserDislikedIngredient::factory()->create();

        $updatedUserDislikedIngredient = [
            'user_preference_id' => $userDislikedIngredient->user_preference_id,
            'ingredient_id' => $userDislikedIngredient->ingredient_id,
        ];

        $response = $this->put("/user_disliked_ingredients/{$userDislikedIngredient->id}", $updatedUserDislikedIngredient );
        $response->assertStatus(302);
        $this->assertDatabaseHas('user_disliked_ingredients', $updatedUserDislikedIngredient);
        $userDislikedIngredient->delete();
    }

    public function test_destroy_data() {
        $userDislikedIngredient = UserDislikedIngredient::factory()->create();
        $response = $this->delete("/user_disliked_ingredients/{$userDislikedIngredient->id}");
        $response->assertStatus(302);
        $this->assertDatabaseMissing('user_disliked_ingredients', ['id' => $userDislikedIngredient->id]);
        $userDislikedIngredient->delete();
    }
}
