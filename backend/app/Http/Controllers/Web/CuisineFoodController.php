<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\CuisineFood;
use Illuminate\Http\Request;

class CuisineFoodController extends Controller
{
    public function index() {
        $cuisineFood = CuisineFood::all();
        return view('CuisineFoods.CuisineFoodsIndex', compact('cuisineFood'));
    }

    public function create() {
        return view('CuisineFoods.CuisineFoodsCreate');
    }

    public function store(Request $request) {
        $request->validate([
            'cuisine_id' => 'required|integer|exists:cuisines,id',
            'food_id' => 'required|integer|exists:foods,id'
        ]);
        $cuisineFood = CuisineFood::create([
            'cuisine_id' => $request->cuisine_id,
            'food_id' => $request->food_id
        ]);
        return redirect('cuisine_foods')->with('success', 'Cuisine Foods Berhasil Dibuat');
    }

    public function edit($id) {
        $cuisineFood = CuisineFood::findOrFail($id);
        return view('CuisineFoods.CuisineFoodsEdit', compact('cuisineFood'));
    }

    public function update(Request $request, $id) {
        $request->validate([
            'cuisine_id' => 'required|integer|exists:cuisines,id',
            'food_id' => 'required|integer|exists:foods,id'
        ]);
        $cuisineFood = CuisineFood::findOrFail($id);
        $cuisineFood->update([
            'cuisine_id' => $request->cuisine_id,
            'food_id' => $request->food_id
        ]);
        return redirect('cuisine_foods')->with('success', 'Cuisine Foods Berhasil Diperbarui');
    }

    public function destroy($id) {
        $cuisineFood = CuisineFood::findOrFail($id);
        $cuisineFood->delete();
        redirect('cuisine_foods')->with('success', 'Cuisine Foods Berhasil Dihapus');
    }
}
