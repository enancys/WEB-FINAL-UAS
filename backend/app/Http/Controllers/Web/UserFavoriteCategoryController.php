<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\UserFavoriteCategory;
use Illuminate\Http\Request;

class UserFavoriteCategoryController extends Controller
{
    public function index() {
        $userFavoriteCategory = UserFavoriteCategory::all();
        return view('userFavoriteCategories.UserFavoriteCategoriesIndex', compact('userFavoriteCategory'));
    }

    public function create() {
        return view('userFavoriteCategories.UserFavoriteCategoriesCreate');
    }

    public function store(Request $request) {
        $request->validate([
            'user_preference_id' => 'required|integer|exists:user_preferences,id',
            'category_id' => 'required|integer|exists:categories,id'
        ]);
        $userFavoriteCategory = UserFavoriteCategory::create([
            'user_preference_id' => $request->user_preference_id,
            'category_id' => $request->category_id
        ]);
        return redirect('user_favorite_categories')->with('success', 'User Favorite Category Berhasil Dibuat');
    }

    public function edit($id) {
        $userFavoriteCategory = UserFavoriteCategory::findOrFail($id);
        return view('userFavoriteCategories.UserFavoriteCategoriesEdit', compact('userFavoriteCategory'));
    }

    public function update(Request $request, $id) {
        $request->validate([
            'user_preference_id' => 'required|integer|exists:user_preferences,id',
            'category_id' => 'required|integer|exists:categories,id'
        ]);
        $userFavoriteCategory = UserFavoriteCategory::findOrFail($id);
        $userFavoriteCategory->update([
            'user_preference_id' => $request->user_preference_id,
            'category_id' => $request->category_id
        ]);
        return redirect('user_favorite_categories')->with('success', 'User Favorite Category Berhasil Diperbarui');
    }

    public function destroy($id) {
        $userFavoriteCategory = UserFavoriteCategory::findOrFail($id);
        $userFavoriteCategory->delete();
        return redirect('user_favorite_categories')->with('success', 'User Favorite Category Berhasil Dihapus');
    }
}
