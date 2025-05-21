<?php

namespace Tests\Feature;

use App\Models\Category;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class CategoryTest extends TestCase
{
    /**
     * A basic feature test example.
     */

    public function test_index_data() {
        $response = $this->get('/categories');
        $response->assertStatus(200);
    }

    public function test_store_data() {
        $category = Category::factory()->create();
        $response = $this->post('/categories', $category->toArray());
        $response->assertStatus(302);
        $this->assertDatabaseHas('categories', $category->toArray());
        $category->delete();
    }
    public function test_edit_data() {
        $category = Category::factory()->create();
        $response = $this->get("/categories/{$category->id}/edit");
        $response->assertStatus(200);
        $category->delete();
    }
    public function test_update_data() {
        $category = Category::factory()->create();
        $updatedCategory = [
            'name'  => 'Nama Ketegori' 
        ];

        $response = $this->put("/categories/{$category->id}", $updatedCategory );
        $response->assertStatus(302);
        $this->assertDatabaseHas('categories', $updatedCategory);
        $category->delete();
    }

    public function test_destroy_data() {
        $category = Category::factory()->create();
        $response = $this->delete("/categories/{$category->id}");
        $response->assertStatus(302);
        $this->assertDatabaseMissing('categories', ['id' => $category->id]);
        $category->delete();
    }
}
