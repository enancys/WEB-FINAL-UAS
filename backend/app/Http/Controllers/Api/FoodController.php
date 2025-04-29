<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Food;
use Illuminate\Http\Request;

class FoodController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $food = Food::with('restaurant', 'cuisine')->get();
        return response()->json($food, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'description' => 'required|string',
            'price' => 'required|numeric',
            'image_url' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'restaurant_id' => 'required|integer|exists:restaurants,id',
            'cuisine_id' => 'required|integer|exists:cuisines,id'
        ]);

        if ($request->hasFile('image_url')) {
            $path = $request->file('image_url')->store('foods', 'public');
            $validated['image_url'] = '/storage/' . $path;
        }

        $food = Food::create($validated);
        return response()->json($food,201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $food = Food::findOrFail($id);
        return response()->json($food, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'description' => 'required|string',
            'price' => 'required|numeric',
            'image_url' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'restaurant_id' => 'required|integer|exists:restaurants,id',
            'cuisine_id' => 'required|integer|exists:cuisines,id'
        ]);

        if ($request->hasFile('image_url')) {
            $path = $request->file('image_url')->store('foods', 'public');
            $validated['image_url'] = '/storage/' . $path;
        }

        $food = Food::findOrFail($id);
        $food->update($validated);
        return response()->json($food, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $food = Food::findOrFail($id);
        $food->delete();
        return response()->json(['message' => 'Food berhasil dihapus'], 200);
    }
}
