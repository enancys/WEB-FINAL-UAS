<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Ingredient;
use Illuminate\Http\Request;

class IngredientController extends Controller
{
    public function index() {
        $ingredient = Ingredient::all();
        return view('Ingredients.IngredientsIndex', compact('ingredient'));
    }

    public function create() {
        return view('ingredients.IngredientsCreate');
    }

    public function store(Request $request) {
        $request->validate([
            'name' => 'required|string'
        ]);

        $ingredient = Ingredient::create([
            'name' => $request->name
        ]);

        return redirect('ingredients')->with('success', 'Ingredient Berhasil Dibuat');

    }

    public function edit($id) {
        $ingredient = Ingredient::findOrFail($id);
        return view('Ingredients.IngredientsEdit', compact('ingredient'));
    }

    public function update(Request $request, $id) {
        $request->validate([
            'name' => 'required|string'
        ]);
        $ingredient = Ingredient::findOrFail($id);
        $ingredient->update([
            'name' => $request->name
        ]);

        return redirect('ingredients')->with('success', 'Ingredient Berhasil Diperbarui');
    }

    public function destroy($id){
        $ingredient = Ingredient::findOrFail($id);
        $ingredient->delete();
        return redirect('ingredients')->with('success', 'Ingredient Berhasil Dihapus');
    }
}
