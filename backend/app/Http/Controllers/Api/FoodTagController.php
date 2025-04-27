<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\FoodTag;
use Illuminate\Http\Request;

class FoodTagController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $foodTag = FoodTag::with('food', 'tag')->get();
        return response()->json($foodTag, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'food_id' => 'required|integer|exists:foods,id',
            'tag_id' => 'required|integer|exists:tags,id'
        ]);

        $foodTag = FoodTag::create($validated);
        return response()->json($foodTag, 201);

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $foodTag = FoodTag::findOrFail($id);
        return response()->json($foodTag, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validated = $request->validate([
            'food_id' => 'required|integer|exists:foods,id',
            'tag_id' => 'required|integer|exists:tags,id'
        ]);
        $foodTag = FoodTag::findOrFail($id);
        $foodTag->update($validated);
        return response()->json($foodTag, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $foodTag = FoodTag::findOrFail($id);
        $foodTag->delete();
        return response()->json(['message' => 'Food Tag berhasil dihapus', 200]);
    }
}
