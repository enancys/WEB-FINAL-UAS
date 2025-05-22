<?php

namespace Tests\Feature;

use App\Models\Restriction;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class RestrictionsTest extends TestCase
{
    /**
     * A basic feature test example.
     */
public function test_index_data() {
        $response = $this->get('/restrictions');
        $response->assertStatus(200);
    }

    public function test_store_data() {
        $restriction = Restriction::factory()->make();
        $response = $this->post('/restrictions', $restriction->toArray());
        $response->assertStatus(302);
        $this->assertDatabaseHas('restrictions', $restriction->toArray());
        $restriction->delete();
    }
    public function test_edit_data() {
        $restriction = Restriction::factory()->create();
        $response = $this->get("/restrictions/{$restriction->id}/edit");
        $response->assertStatus(200);
        $restriction->delete();
    }
    public function test_update_data() {
        $restriction = Restriction::factory()->create();
        $updatedRestriction = [
            'name'  => 'Nama restriction',
        ];

        $response = $this->put("/restrictions/{$restriction->id}", $updatedRestriction );
        $response->assertStatus(302);
        $this->assertDatabaseHas('restrictions', $updatedRestriction);
        $restriction->delete();
    }

    public function test_destroy_data() {
        $restriction = Restriction::factory()->create();
        $response = $this->delete("/restrictions/{$restriction->id}");
        $response->assertStatus(302);
        $this->assertDatabaseMissing('restrictions', ['id' => $restriction->id]);
        $restriction->delete();
    }
}
