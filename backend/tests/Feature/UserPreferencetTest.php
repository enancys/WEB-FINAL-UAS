<?php

namespace Tests\Feature;

use App\Models\UserPreference;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class UserPreferencetTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    public function test_index_data() {
        $response = $this->get('/user_preferences');
        $response->assertStatus(200);
    }

    public function test_store_data() {
        $userPreference = UserPreference::factory()->create();
        $response = $this->post('/user_preferences', $userPreference->toArray());
        $response->assertStatus(302);
        $this->assertDatabaseHas('user_preferences', $userPreference->toArray());
        $userPreference->delete();
    }
    public function test_edit_data() {
        $userPreference = UserPreference::factory()->create();
        $response = $this->get("/user_preferences/{$userPreference->id}/edit");
        $response->assertStatus(200);
        $userPreference->delete();
    }
    public function test_update_data() {
        $userPreference = UserPreference::factory()->create();

        $updatedUserPreference = [
            'user_id' => $userPreference->user_id,
        ];

        $response = $this->put("/user_preferences/{$userPreference->id}", $updatedUserPreference );
        $response->assertStatus(302);
        $this->assertDatabaseHas('user_preferences', $updatedUserPreference);
        $userPreference->delete();
    }

    public function test_destroy_data() {
        $userPreference = UserPreference::factory()->create();
        $response = $this->delete("/user_preferences/{$userPreference->id}");
        $response->assertStatus(302);
        $this->assertDatabaseMissing('user_preferences', ['id' => $userPreference->id]);
        $userPreference->delete();
    }
}
