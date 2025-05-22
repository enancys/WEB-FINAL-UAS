<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\RestaurantFood;
use Illuminate\Http\Request;

class RestaurantFoodController extends Controller
{
    public function index() {
        $restaurantFood = RestaurantFood::all();
        return view('RestaurantFoods.RestaurantFoodsIndex', compact('restaurantFood'));
    }

    public function create() {
        return view('RestaurantFoods.RestaurantFoodsCreate');
    }

    public function store(Request $request) {
        $request->validate([
            'restaurant_id' => 'required|integer|exists:restaurants,id',
            'food_id' => 'required|integer|exists:foods,id',
            'price' => 'required|numeric'
        ]);
        $restaurantFood = restaurantFood::create([
            'restaurant_id' => $request->restaurant_id,
            'food_id' => $request->food_id,
            'price' => $request->price,
        ]);
        return redirect('restaurant_foods')->with('success', 'Restaurant Foods Berhasil Dibuat');
    }

    public function edit($id) {
        $restaurantFood = RestaurantFood::findOrFail($id);
        return view('RestaurantFoods.RestaurantFoodsEdit', compact('restaurantFood'));
    }

    public function update(Request $request, $id) {
        $request->validate([
            'resturant_id' => 'required|integer|exists:restaurants,id',
            'food_id' => 'required|integer|exists:foods,id',
            'price' => 'required|numeric'
        ]);
        $restaurantFood = RestaurantFood::findOrFail($id);
        $restaurantFood->update([
            'restaurant_id' => $request->restaurant_id,
            'food_id' => $request->food_id,
            'price' => $request->price
        ]);
        return redirect('restaurant_foods')->with('success', 'Restaurant Foods Berhasil Diperbarui');
    }

    public function destroy($id) {
        $restaurantFood = RestaurantFood::findOrFail($id);
        $restaurantFood->delete();
        return redirect('restaurant_foods')->with('success', 'Restaurant Foods Berhasil Dihapus');
    }
}
