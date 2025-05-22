<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class UserTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    public function test_index_data() {
        $response = $this->get('/users');
        $response->assertStatus(200);
    }
public function test_store_data()
{
    $uniqueEmail = 'user' . time() . '@example.net';

    $userData = [
        'name' => 'Cathryn Connelly',
        'email' => $uniqueEmail,
        'role' => 'user',
        'password' => 'secret123',
    ];

    $response = $this->post('/users', $userData);
    $response->assertStatus(302);

    $this->assertDatabaseHas('users', [
        'name' => $userData['name'],
        'email' => $userData['email'],
        'role' => $userData['role'],
    ]);

    User::where('email', $uniqueEmail)->delete();
}

    public function test_edit_data() {
        $user = User::factory()->create();
        $response = $this->get("/users/{$user->id}/edit");
        $response->assertStatus(200);
        $user->delete();
    }
    public function test_update_data() {
        $user = User::factory()->create();
        $updatedUser = [
            'name'  => 'Nama User',
            'email' => 'user@example.com',
            'password' => 'newpassword123', 
            'role' => 'user'
        ];

        $response = $this->put("/users/{$user->id}", $updatedUser );
        $response->assertStatus(302);
        $this->assertDatabaseHas('users', $updatedUser);
        $user->delete();
    }

    public function test_destroy_data() {
        $user = User::factory()->create();
        $response = $this->delete("/users/{$user->id}");
        $response->assertStatus(302);
        $this->assertDatabaseMissing('users', ['id' => $user->id]);
        $user->delete();
    }
}
