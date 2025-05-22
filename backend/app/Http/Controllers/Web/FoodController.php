<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Food;
use Illuminate\Http\Request;

class FoodController extends Controller
{
    public function index() {
        $food = Food::all();
        return view('Foods.FoodsIndex', compact('food'));
    }

    public function create() {
        return view('Foods.FoodsCreate');
    }

    public function store(Request $request) {
        $request->validate([
            'name' => 'required|string',
            'description' => 'required|string',
            'price' => 'required|numeric',
            'image_url' => 'required|string',
            'restaurant_id' => 'required|integer|exists:restaurants,id',
            'cuisine_id' => 'required|integer|exists:cuisines,id'
        ]);
        $food = Food::create([
            'name' => $request->name,
            'description' => $request->description,
            'price' => $request->price,
            'image_url' => $request->image_url,
            'restaurant_id' => $request->restaurant_id,
            'cuisine_id' => $request->cuisine_id,
        ]);
        return redirect('foods')->with('success', 'Food Berhasil Dibuat');
    }

    public function edit($id) {
        $food = Food::findOrFail($id);
        return view('Foods.FoodsEdit', compact('food'));
    }

    public function update(Request $request, $id) {
        $request->validate([
            'name' => 'required|string',
            'description' => 'required|string',
            'price' => 'required|numeric',
            'image_url' => 'required|string',
            'restaurant_id' => 'required|integer|exists:restaurants,id',
            'cuisine_id' => 'required|integer|exists:cuisines,id'
        ]);
        $food = Food::findOrFail($id);
        $food->update([
            'name' => $request->name,
            'description' => $request->description,
            'price' => $request->price,
            'image_url' => $request->image_url,
            'restaurant_id' => $request->restaurant_id,
            'cuisine_id' => $request->cuisine_id,
        ]);
        return redirect('foods')->with('success', 'Food Berhasil Dihapus');
    }

    public function destroy($id) {
        $food = Food::findOrFail($id);
        $food->delete();
        return redirect('foods')->with('success', 'Food Berhasil Dihapus');
    }
}
