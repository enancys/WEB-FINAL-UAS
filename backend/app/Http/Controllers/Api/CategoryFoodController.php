<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CategoryFood;
use Illuminate\Http\Request;

class CategoryFoodController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categoryFood = CategoryFood::with('category', 'food')->get();
        return response()->json(
            [
                'success' => true,
                'message' => 'Data berhasil dimuat',
                'data' => $categoryFood
            ], 200
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'category_id' => 'required|integer|exists:categories,id',
            'food_id' => 'required|integer|exists:foods,id'
        ]);

        $categoryFood = CategoryFood::create($validated);
        return response()->json(
            [
                'success' => true,
                'message' => 'Data berhasil dibuat',
                'data' => $categoryFood
            ], 201
        );
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $categoryFood = CategoryFood::with(['food', 'category'])->findOrFail($id);
        return response()->json(
            [
                'success' => true,
                'message' => "Data dengan id: {$id} berhasil ditemukan",
                'data' => $categoryFood
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
                'category_id' => 'required|integer|exists:categories,id',
                'food_id' => 'required|integer|exists:foods,id'
            ]
        );

        $categoryFood = CategoryFood::findOrFail($id);
        $categoryFood->update($validated);

        return response()->json(
            [
                'success' => true,
                'message' => "Data dengan id: {$id} berhasil diupdate",
                'data' => $categoryFood
            ]
        );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $categoryFood = CategoryFood::findOrFail($id);
        $categoryFood->delete();

        return response()->json(
            [
                'success' => true,
                'message' => "Data dengan id: {$id} berhasil dihapus",
                'data' => null
            ], 200
        );
    }
}
