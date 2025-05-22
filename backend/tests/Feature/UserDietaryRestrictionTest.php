<?php

namespace Tests\Feature;

use App\Models\UserDietaryResctriction;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class UserDietaryRestrictionTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    public function test_index_data() {
        $response = $this->get('/user_dietary_restrictions');
        $response->assertStatus(200);
    }

    public function test_store_data() {
        $userDietaryRestriction = UserDietaryResctriction::factory()->create();
        $response = $this->post('/user_dietary_restrictions', $userDietaryRestriction->toArray());
        $response->assertStatus(302);
        $this->assertDatabaseHas('user_dietary_restrictions', $userDietaryRestriction->toArray());
        $userDietaryRestriction->delete();
    }
    public function test_edit_data() {
        $userDietaryRestriction = UserDietaryResctriction::factory()->create();
        $response = $this->get("/user_dietary_restrictions/{$userDietaryRestriction->id}/edit");
        $response->assertStatus(200);
        $userDietaryRestriction->delete();
    }
    public function test_update_data() {
        $userDietaryRestriction = UserDietaryResctriction::factory()->create();

        $updatedUserDietaryRestriction = [
            'user_preference_id' => $userDietaryRestriction->user_preference_id,
            'restriction_id' => $userDietaryRestriction->restriction_id,
        ];

        $response = $this->put("/user_dietary_restrictions/{$userDietaryRestriction->id}", $updatedUserDietaryRestriction );
        $response->assertStatus(302);
        $this->assertDatabaseHas('user_dietary_restrictions', $updatedUserDietaryRestriction);
        $userDietaryRestriction->delete();
    }

    public function test_destroy_data() {
        $userDietaryRestriction = UserDietaryResctriction::factory()->create();
        $response = $this->delete("/user_dietary_restrictions/{$userDietaryRestriction->id}");
        $response->assertStatus(302);
        $this->assertDatabaseMissing('user_dietary_restrictions', ['id' => $userDietaryRestriction->id]);
        $userDietaryRestriction->delete();
    }
}