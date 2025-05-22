<?php

namespace Tests\Feature;

use App\Models\Tag;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class TagTest extends TestCase
{
    /**
     * A basic feature test example.
     */
public function test_index_data() {
        $response = $this->get('/tags');
        $response->assertStatus(200);
    }

    public function test_store_data() {
        $tag = Tag::factory()->make();
        $response = $this->post('/tags', $tag->toArray());
        $response->assertStatus(302);
        $this->assertDatabaseHas('tags', $tag->toArray());
        $tag->delete();
    }
    public function test_edit_data() {
        $tag = Tag::factory()->create();
        $response = $this->get("/tags/{$tag->id}/edit");
        $response->assertStatus(200);
        $tag->delete();
    }
    public function test_update_data() {
        $tag = Tag::factory()->create();
        $updatedCuisine = [
            'name'  => 'Nama tag',
        ];

        $response = $this->put("/tags/{$tag->id}", $updatedCuisine );
        $response->assertStatus(302);
        $this->assertDatabaseHas('tags', $updatedCuisine);
        $tag->delete();
    }

    public function test_destroy_data() {
        $tag = Tag::factory()->create();
        $response = $this->delete("/tags/{$tag->id}");
        $response->assertStatus(302);
        $this->assertDatabaseMissing('tags', ['id' => $tag->id]);
        $tag->delete();
    }
}
