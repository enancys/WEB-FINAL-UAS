<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\CategoryFood;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class CategoryFoodTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    public function test_index_data() {
        $response = $this->get('/category_foods');
        $response->assertStatus(200);
    }

    public function test_store_data() {
        $categoryFood = CategoryFood::factory()->create();
        $response = $this->post('/category_foods', $categoryFood->toArray());
        $response->assertStatus(302);
        $this->assertDatabaseHas('category_food', $categoryFood->toArray());
        $categoryFood->delete();
    }
    public function test_edit_data() {
        $categoryFood = CategoryFood::factory()->create();
        $response = $this->get("/category_foods/{$categoryFood->id}/edit");
        $response->assertStatus(200);
        $categoryFood->delete();
    }
    public function test_update_data() {
        $categoryFood = CategoryFood::factory()->create();
        $category = Category::factory()->create();

        $updatedCategoryFood = [
            'category_id' => $category->id,
            'food_id' => $categoryFood->food_id
        ];

        $response = $this->put("/category_foods/{$categoryFood->id}", $updatedCategoryFood );
        $response->assertStatus(302);
        $this->assertDatabaseHas('category_food', $updatedCategoryFood);
        $categoryFood->delete();
    }

    public function test_destroy_data() {
        $categoryFood = CategoryFood::factory()->create();
        $response = $this->delete("/category_foods/{$categoryFood->id}");
        $response->assertStatus(302);
        $this->assertDatabaseMissing('category_food', ['id' => $categoryFood->id]);
        $categoryFood->delete();
    }
}
