<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\UserDislikedIngredient;
use Illuminate\Http\Request;

class UserDislikedIngredientController extends Controller
{
    public function index() {
        $userDislikedIngredient = UserDislikedIngredient::all();
        return view('UserDislikedIngredients.UserDislikedIngredientsIndex', compact('userDislikedIngredient'));
    }

    public function create() {
        return view('UserDislikedIngredients.UserDislikedIngredientsCreate');
    }

    public function store(Request $request) {
        $request->validate([
            'user_preference_id' => 'required|integer|exists:user_preferences,id',
            'ingredient_id' => 'required|integer|exists:ingredients,id'
        ]);
        $userDislikedIngredient = UserDislikedIngredient::create([
            'user_preference_id' => $request->user_preference_id,
            'ingredient_id' => $request->ingredient_id
        ]);
        return redirect('user_disliked_ingredients')->with('success', 'User Disliked Ingredient Berhasil Dibuat');
    }

    public function edit($id) {
        $userDislikedIngredient = UserDislikedIngredient::findOrFail($id);
        return view('UserDislikedIngredients.UserDislikedIngredientsEdit', compact('userDislikedIngredient'));
    }

    public function update(Request $request, $id) {
        $request->validate([
            'user_preference_id' => 'required|integer|exists:user_preferences,id',
            'ingredient_id' => 'required|integer|exists:ingredients,id'
        ]);
        $userDislikedIngredient = UserDislikedIngredient::findOrFail($id);
        $userDislikedIngredient->update([
            'user_preference_id' => $request->user_preference_id,
            'ingredient_id' => $request->ingredient_id
        ]);
        return redirect('user_disliked_ingredients')->with('success', 'User Disliked Ingredient Berhasil Diperbarui');
    }

    public function destroy($id) {
        $userDislikedIngredient = UserDislikedIngredient::findOrFail($id);
        $userDislikedIngredient->delete();
        redirect('user_disliked_ingredients')->with('success', 'User Disliked Ingredient Berhasil Dihapus');
    }
}
