<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\IngredientRestriction;
use Illuminate\Http\Request;

class IngredientRestrictionController extends Controller
{
    public function index() {
        $ingredientRestriction = IngredientRestriction::all();
        return view('IngredientRestrictions.IngredientRestrictionsIndex', compact('ingredientRestriction'));
    }
    public function create() {
        return view('IngredientRestrictions.IngredientRestrictionsCreate');
    }
    public function edit($id) {
        $ingredientRestriction = IngredientRestriction::findOrFail($id);
        return view('IngredientRestrictions.IngredientRestrictionsEdit', compact('ingredientRestriction'));
    }
    public function store(Request $request) {
        $request->validate([
            'ingredient_id' => 'required|integer|exists:ingredients,id',
            'restriction_id' => 'required|integer|exists:restrictions,id'
        ]);
        $ingredientRestriction = IngredientRestriction::create([
            'ingredient_id' => $request->ingredient_id,
            'restriction_id' => $request->restriction_id
        ]);
        return redirect('ingredient_restrictions')->with('success', 'Ingredient Restrictions Berhasil Dibuat');     
    }

    public function update(Request $request, $id) {
        $request->validate([
            'ingredient_id' => 'required|integer|exists:ingredients,id',
            'restriction_id' => 'required|integer|exists:restrictions,id'
        ]);

        $ingredientRestriction = IngredientRestriction::findOrFail($id);
        $ingredientRestriction->update([
            'ingredient_id' => $request->ingredient_id,
            'restriction_id' => $request->restriction_id
        ]);
        return redirect('ingredient_restrictions')->with('success', 'Ingredient Restrictions Berhasil Diupdate');
    }

    public function destroy($id) {
        $ingredientRestriction = IngredientRestriction::findOrFail($id);
        $ingredientRestriction->delete();
        return redirect('ingredient_restrictions')->with('success', 'Ingredient Restrictions Berhasil Dihapus');
    }
}

