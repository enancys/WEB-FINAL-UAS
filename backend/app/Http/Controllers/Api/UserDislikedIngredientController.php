<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\UserDislikedIngredient;
use Illuminate\Http\Request;

class UserDislikedIngredientController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $userDislikedIngredient = UserDislikedIngredient::with('userPreference.user', 'ingredient')->get();
        return response()->json(
            [
                'success' => true,
                'message' => "Data Berhasil Dimuat",
                'data' => $userDislikedIngredient
            ], 200
        );
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
        $userDislikedIngredient = UserDislikedIngredient::create($validated);
        return response()->json(
            [
                'success' => true,
                'message' => "Data Berhasil Dibuat",
                'data' => $userDislikedIngredient
            ], 201
        );
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $userDislikedIngredient = UserDislikedIngredient::findOrFail($id);
        return response()->json(
            [
                'success' => true,
                'message' => "Data Dengan ID {$id} Berhasil Dimuat",
                'data' => $userDislikedIngredient
            ], 200
        );
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
        $userDislikedIngredient = UserDislikedIngredient::findOrFail($id);
        $userDislikedIngredient->update($validated);
        return response()->json(
            [
                'success' => true,
                'message' => "Data Dengan ID {$id} Berhasil Diupdate",
                'data' => $userDislikedIngredient
            ], 200
        );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $userDislikedIngredient = UserDislikedIngredient::findOrFail($id);
        $userDislikedIngredient->delete();
        return response()->json(
            [
                'success' => true,
                'message' => "Data Dengan ID {$id} Berhasil Dihapus",
                'data' => null
            ], 200
        );
    }
}
