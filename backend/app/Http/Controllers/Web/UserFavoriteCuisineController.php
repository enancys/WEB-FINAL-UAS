<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\UserFavoriteCuisine;
use Illuminate\Http\Request;

class UserFavoriteCuisineController extends Controller
{
    public function index() {
        $userFavoriteCuisine = UserFavoriteCuisine::all();
        return view('UserFavoriteCuisines.UserFavoriteCuisinesIndex', compact('userFavoriteCuisine'));
    }

    public function create() {
        return view('UserFavoriteCuisines.UserFavoriteCuisinesCreate');
    }

    public function store(Request $request) {
        $request->validate([
            'user_preference_id' => 'required|integer|exists:user_preferences,id',
            'cuisine_id' => 'required|integer|exists:cuisines,id'
        ]);
        $userFavoriteCuisine = UserFavoriteCuisine::create([
            'user_preference_id' => $request->user_preference_id,
            'cuisine_id' => $request->cuisine_id
        ]);
        return redirect('user_favorite_cuisines')->with('success', 'User Favorite Cuisine Berhasil Dibuat');
    }

    public function edit($id) {
        $userFavoriteCuisine = UserFavoriteCuisine::findOrFail($id);
        return view('UserFavoriteCuisines.UserFavoriteCuisinesEdit', compact('userFavoriteCuisine'));
    }

    public function update(Request $request, $id) {
        $request->validate([
            'user_preference_id' => 'required|integer|exists:user_preferences,id',
            'cuisine_id' => 'required|integer|exists:cuisines,id'
        ]);
        $userFavoriteCuisine = UserFavoriteCuisine::findOrFail($id);
        $userFavoriteCuisine->update([
            'user_preference_id' => $request->user_preference_id,
            'cuisine_id' => $request->cuisine_id
        ]);
        return redirect('user_favorite_cuisines')->with('success', 'User Favorite Cuisine Berhasil Diperbarui');
    }

    public function destroy($id) {
        $userFavoriteCuisine = UserFavoriteCuisine::findOrFail($id);
        $userFavoriteCuisine->delete();
        return redirect('user_favorite_cuisines')->with('success', 'User Favorite Cuisine Berhasil Dihapus');
    }
}
