<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index() {
        $user = User::all();
        return view('Users.UsersIndex', compact('user'));
    }

    public function create() {
        return view('Users.UsersCreate');
    }

    public function store(Request $request) {
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|string',
            'role' => 'required|string|in:admin,user',
            'password' => 'required|string'
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'role' => $request->role,
            'password' => $request->password,
        ]);

        return redirect('users')->with('success', 'User berhasil ditambahkan');
    }

    public function edit($id) {
        $user = User::findOrFail($id);
        return view('Users.UsersEdit', compact('user'));
    }

    public function update(Request $request, $id) {
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|string',
            'role' => 'required|string|in:admin,user',
            'password' => 'required|string'
        ]);

        $user = User::findOrFail($id);
        $user->update([
            'name' => $request->name,
            'email' => $request->email,
            'role' => $request->role,
            'password' => $request->password,
        ]);
        return redirect('users')->with('success', 'User berhasil diperbarui');
    }
    public function destroy($id) {
        $user = User::findOrFail($id);
        $user->delete();

        return redirect('users')->with('success', 'User berhasil dihapus'); 
    }
}
