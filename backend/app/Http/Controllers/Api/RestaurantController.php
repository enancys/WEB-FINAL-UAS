<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Restaurant;
use Illuminate\Http\Request;

class RestaurantController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $restaurant = Restaurant::with('cuisine')->get();
        return response()->json($restaurant, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'location' => 'required|string',
            'phone' => 'required|string',
            'website_url' => 'nullable|string',
            'opening_hours' => 'required|string',
            'cuisine_id' => 'nullable|integer|exists:cuisines,id',
            'rating' => 'nullable|numeric',
            'description' => 'nullable|string',
            "image_url" => "nullable|string"
        ]);

        $restaurant = Restaurant::create($validated);
        return response()->json($restaurant, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $restaurant = Restaurant::findOrFail($id);
        return response()->json($restaurant, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'location' => 'required|string',
            'phone' => 'required|string',
            'website_url' => 'nullable|string',
            'opening_hours' => 'required|string',
            'cuisine_id' => 'nullable|integer|exists:cuisines,id',
            'rating' => 'nullable|numeric',
            'description' => 'nullable|string',
            "image_url" => "nullable|string"
        ]);

        $restaurant = Restaurant::findOrFail($id);
        $restaurant->update($validated);
        return response()->json($restaurant, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $restaurant = Restaurant::findOrFail($id);
        $restaurant->delete();
        return response()->json(['message' => 'Restaurant Berhasil Dihapus'], 200);
    }
}
