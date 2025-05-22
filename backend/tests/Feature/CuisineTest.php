<?php

namespace Tests\Feature;

use App\Models\Cuisine;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class CuisineTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    public function test_index_data() {
        $response = $this->get('/cuisines');
        $response->assertStatus(200);
    }

    public function test_store_data() {
        $cuisine = Cuisine::factory()->make();
        $response = $this->post('/cuisines', $cuisine->toArray());
        $response->assertStatus(302);
        $this->assertDatabaseHas('cuisines', $cuisine->toArray());
        $cuisine->delete();
    }
    public function test_edit_data() {
        $cuisine = Cuisine::factory()->create();
        $response = $this->get("/cuisines/{$cuisine->id}/edit");
        $response->assertStatus(200);
        $cuisine->delete();
    }
    public function test_update_data() {
        $cuisine = Cuisine::factory()->create();
        $updatedCuisine = [
            'name'  => 'Nama Cuisine',
            'description' => 'Deskripsi Cuisine'
        ];

        $response = $this->put("/cuisines/{$cuisine->id}", $updatedCuisine );
        $response->assertStatus(302);
        $this->assertDatabaseHas('cuisines', $updatedCuisine);
        $cuisine->delete();
    }

    public function test_destroy_data() {
        $cuisine = Cuisine::factory()->create();
        $response = $this->delete("/cuisines/{$cuisine->id}");
        $response->assertStatus(302);
        $this->assertDatabaseMissing('cuisines', ['id' => $cuisine->id]);
        $cuisine->delete();
    }
}
