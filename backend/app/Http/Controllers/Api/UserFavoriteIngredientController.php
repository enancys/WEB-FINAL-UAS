<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Food;
use App\Models\UserFavoriteIngredient;
use Illuminate\Http\Request;
use PhpParser\Node\Expr\Empty_;

class UserFavoriteIngredientController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $userFavoriteIngredient = UserFavoriteIngredient::with('userPreference.user', 'ingredient')->get();
        return response()->json($userFavoriteIngredient, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_preference_id' => 'required|integer|exists:user_preferences,id',
            'ingredient_id' => 'required|integer|exists:ingredients,id'
        ]);
        $userFavoriteIngredient = UserFavoriteIngredient::create($validated);
        return response()->json($userFavoriteIngredient, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $userFavoriteIngredient = UserFavoriteIngredient::findOrFail($id);
        return response()->json($userFavoriteIngredient, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validated = $request->validate([
            'user_preference_id' => 'required|integer|exists:user_preferences,id',
            'ingredient_id' => 'required|integer|exists:ingredients,id'
        ]);

        $userFavoriteIngredient = UserFavoriteIngredient::findOrFail($id);
        $userFavoriteIngredient->update($userFavoriteIngredient);
        return response()->json($userFavoriteIngredient, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $userFavoriteIngredient = UserFavoriteIngredient::findOrFail($id);
        $userFavoriteIngredient->delete();
        return response()->json(['mesaage' => 'User Favorite Ingredient Berhasil Dihapus', 200]);
    }

}
