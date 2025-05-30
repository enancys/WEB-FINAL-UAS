<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\RestaurantFood;
use Illuminate\Http\Request;

class RestaurantFoodController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $restaurantFood = RestaurantFood::with(
            'restaurant', 
                'food', 
                'food.cuisine', 
                'food.ingredients')->get();
                
        return response()->json(
            [
                'success' => true,
                'message' => "Data Berhasil Dimuat",
                'data' => $restaurantFood
            ], 200
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'restaurant_id' => 'required|integer|exists:restaurants,id',
            'food_id' => 'required|integer|exists:foods,id',
            'price' => 'required|numeric'
        ]);
        $restaurantFood = RestaurantFood::create($validated);
        return response()->json(
            [
                'success' => true,
                'message' => "Data Berhasil Dibuat",
                'data' => $restaurantFood
            ], 201
        );
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $restaurantFood = RestaurantFood::findOrFail($id);
        return response()->json(
            [
                'success' => true,
                'message' => "Data Dengan ID {$id} Berhasil Dimuat",
                'data' => $restaurantFood
            ], 200
        );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validated = $request->validate([
            'restaurant_id' => 'required|integer|exists:restaurants,id',
            'food_id' => 'required|integer|exists:foods,id',
            'price' => 'required|numeric'
        ]);

        $restaurantFood = RestaurantFood::findOrFail($id);
        $restaurantFood->update($validated);
        return response()->json(
            [
                'success' => true,
                'message' => "Data Dengan ID {$id} Berhasil Diupdate",
                'data' => $restaurantFood
            ], 200
        );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $restaurantFood = RestaurantFood::findOrFail($id);
        $restaurantFood->delete();
                return response()->json(
            [
                'success' => true,
                'message' => "Data Dengan ID {$id} Berhasil Dihapus",
                'data' => null
            ], 200
        );
    }
}
