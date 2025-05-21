<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Cuisine;
use App\Models\CuisineFood;
use Illuminate\Http\Request;

class CuisineFoodController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $cuisineFood = CuisineFood::with('cuisine', 'food')->get();
        return response()->json(
            [
                'success' => true,
                'message' => 'Data berhasil dimuat',
                'data' => $cuisineFood
            ], 200
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate(
            [
                'cuisine_id' => 'required|integer|exists:cuisines,id',
                'food_id' => 'required|integer|exists:foods,id'
            ]
        );

        $cuisineFood = CuisineFood::create($validated);
        return response()->json(
            [
                'success' => true,
                'message' => "Data berhasil dibuat",
                'data' => $cuisineFood
            ], 201
        );
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $cuisineFood = CuisineFood::with(['cuisine', 'food'])->findOrFail($id);
        return response()->json(
            [
                'success' => true,
                'message' => "Data dengan id: {$id} berhasil ditemukan",
                'data' => $cuisineFood
            ], 200
        );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validated = $request->validate(
            [
                'cuisine_id' => 'required|integer|exists:cuisines,id',
                'food_id' => 'required|integer|exists:foods,id'
            ]
        );

        $cuisineFood = CuisineFood::findOrFail($id);
        $cuisineFood->update($validated);

        return response()->json(
            [
                'success' => true,
                'message' => "Data dengan id: {$id} berhasil diupdate",
                'data' => $cuisineFood
            ]
        );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $cuisineFood = CuisineFood::findOrFail($id);
        $cuisineFood->delete();

        return response()->json(
            [
                'success' => true,
                'message' => "Data dengan id: {$id} berhasil dihapus",
                'data' => null
            ], 200
        );
    }
}
