<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\UserFavoriteIngredient;
use Illuminate\Http\Request;

class UserFavoriteIngredientController extends Controller
{
    public function index() {
        $userFavoriteIngredient = UserFavoriteIngredient::all();
        return view('UserFavoriteIngredients.UserFavoriteIngredientsIndex', compact('userFavoriteIngredient'));
    }

    public function create() {
        return view('UserFavoriteIngredients.UserFavoriteIngredientsCreate');
    }

    public function store(Request $request) {
        $request->validate([
            'user_preference_id' => 'required|integer|exists:user_preferences,id',
            'ingredient_id' => 'required|integer|exists:ingredients,id'
        ]);
        $userFavoriteIngredient = UserFavoriteIngredient::create([
            'user_preference_id' => $request->user_preference_id,
            'ingredient_id' => $request->ingredient_id
        ]);
        return redirect('user_disliked_ingredients')->with('success', 'User Favorite Ingredient Berhasil Dibuat');
    }

    public function edit($id) {
        $userFavoriteIngredient = UserFavoriteIngredient::findOrFail($id);
        return view('UserFavoriteIngredients.UserFavoriteIngredientsEdit', compact('userFavoriteIngredient'));
    }

    public function update(Request $request, $id) {
        $request->validate([
            'user_preference_id' => 'required|integer|exists:user_preferences,id',
            'ingredient_id' => 'required|integer|exists:ingredients,id'
        ]);
        $userFavoriteIngredient = UserFavoriteIngredient::findOrFail($id);
        $userFavoriteIngredient->update([
            'user_preference_id' => $request->user_preference_id,
            'ingredient_id' => $request->ingredient_id
        ]);
        return redirect('user_disliked_ingredients')->with('success', 'User Favorite Ingredient Berhasil Diperbarui');
    }

    public function destroy($id) {
        $userFavoriteIngredient = UserFavoriteIngredient::findOrFail($id);
        $userFavoriteIngredient->delete();
        redirect('user_disliked_ingredients')->with('success', 'User Favorite Ingredient Berhasil Dihapus');
    }
}
