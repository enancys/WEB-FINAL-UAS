<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\FoodIngredient;
use Illuminate\Http\Request;

class FoodIngredientController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $foodIngredient = FoodIngredient::with('food', 'ingredient')->get();
        return response()->json($foodIngredient);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'food_id' => 'required|numeric|exists:foods,id',
            'ingredient_id' => 'required|numeric|exists:ingredients,id',
            'quantity' => 'nullable|string',
            'unit' => 'nullable|string'
        ]);

        $foodIngredient = FoodIngredient::create($validated);
        return response()->json($foodIngredient, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $foodIngredient = FoodIngredient::findOrFail($id);
        return response()->json($foodIngredient, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validated = $request->validate([
            'food_id' => 'required|numeric|exists:foods,id',
            'ingredient_id' => 'required|numeric|exists:ingredients,id',
            'quantity' => 'nullable|string',
            'unit' => 'nullable|string'
        ]);

        $foodIngredient = FoodIngredient::findOrFail($id);
        $foodIngredient->update($validated);
        return response()->json($foodIngredient, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $foodIngredient = FoodIngredient::findOrFail($id);
        $foodIngredient->delete();
        return response()->json(['message' => 'Food ingredient berhasil dihapus'], 200);

    }
}
