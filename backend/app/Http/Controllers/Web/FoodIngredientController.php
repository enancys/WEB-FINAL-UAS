<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\FoodIngredient;
use Illuminate\Http\Request;

class FoodIngredientController extends Controller
{
    public function index() {
        $foodIngredient = FoodIngredient::all();
        return view('FoodIngredients.FoodIngredientsIndex', compact('foodIngredient'));
    }

    public function create() {
        return view('FoodIngredients.FoodIngredientsCreate');
    }

    public function store(Request $request) {
        $request->validate([
            'food_id' => 'required|integer|exists:foods,id',
            'ingredient_id' => 'required|integer|exists:ingredients,id',
            'quantity' => 'nullable|numeric',
            'unit' => 'nullable|string'
        ]);
        $foodIngredient = FoodIngredient::create([
            'food_id' => $request->food_id,
            'ingredient_id' => $request->ingredient_id,
            'quantity' => $request->quantity,
            'unit' => $request->unit,
        ]);
        return redirect('food_ingredients')->with('success', 'Food Ingredient Berhasil Dibuat');
    }

    public function edit($id) {
        $foodIngredient = FoodIngredient::findOrFail($id);
        return view('FoodIngredients.FoodIngredientsEdit', compact('foodIngredient'));
    }

    public function update(Request $request, $id) {
        $request->validate([
            'food_id' => 'required|integer|exists:foods,id',
            'ingredient_id' => 'required|integer|exists:ingredients,id',
            'quantity' => 'nullable|numeric',
            'unit' => 'nullable|string'
        ]);
        $foodIngredient = FoodIngredient::findOrFail($id);
        $foodIngredient->update([
            'food_id' => $request->food_id,
            'ingredient_id' => $request->ingredient_id,
            'quantity' => $request->quantity,
            'unit' => $request->unit,
        ]);
        return redirect('food_ingredients')->with('success', 'Food Ingredient Berhasil Diupdate');
    }

    public function destroy($id) {
        $foodIngredient = FoodIngredient::findOrFail($id);
        $foodIngredient->delete();
        return redirect('food_ingredients')->with('success', 'Food Ingredient Berhasil Dihapus');
    }
}
