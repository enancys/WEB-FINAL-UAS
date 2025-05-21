<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\UserPreference;
use Illuminate\Http\Request;

class UserPreferenceController extends Controller
{
    public function index() {
        $userPreference = UserPreference::all();
        return view('UserPreferences.UserPreferencesIndex', compact('userPreference'));
    }

    public function create() {
        return view('UserPreferences.UserPreferencesCreate');
    }

    public function store(Request $request) {
        $request->validate([
            'user_id' => 'required|integer|exists:users,id'
        ]);

        $userPreference = UserPreference::create([
            'user_id' => $request->user_id
        ]);

        return redirect('user_preferences')->with('success', 'userPreference berhasil ditambahkan');
    }

    public function edit($id) {
        $userPreference = UserPreference::findOrFail($id);
        return view('UserPreferences.UserPreferencesEdit', compact('userPreference'));
    }

    public function update(Request $request, $id) {
        $request->validate([
            'user_id' => 'required|integer|exists:users,id'
        ]);

        $userPreference = UserPreference::findOrFail($id);
        $userPreference->update([
            'user_id' => $request->user_id
        ]);
        return redirect('user_preferences')->with('success', 'userPreference berhasil diperbarui');
    }
    public function destroy($id) {
        $userPreference = UserPreference::findOrFail($id);
        $userPreference->delete();

        return redirect('user_preferences')->with('success', 'userPreference berhasil dihapus'); 
    }
}
