<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Rating;
use Illuminate\Http\Request;

class RatingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $rating = Rating::with('user', 'food', 'restaurant')->get();
        return response()->json($rating, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|integer|exists:users,id',
            'food_id' => 'required|integer|exists:foods,id',
            'restaurant_id' => 'required|integer|exists:restaurants,id',
            'rating' => 'required|numeric',
            'review' => 'nullable|string'
        ]);
        $rating = Rating::create($validated);
        return response()->json($rating, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $rating = Rating::findOrFail($id);
        return response()->json($rating, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validated = $request->validate([
            'user_id' => 'required|integer|exists:users,id',
            'food_id' => 'required|integer|exists:foods,id',
            'restaurant_id' => 'required|integer|exists:restaurants,id',
            'rating' => 'required|numeric',
            'review' => 'nullable|string'
        ]);
        $rating = Rating::findOrFail($id);
        $rating->update($validated);
        return response()->json($rating, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $rating = Rating::findOrFail($id);
        $rating->delete();
        return response()->json(['message' => 'Rating Berhasil Dihapus', 200]);
    }
}
