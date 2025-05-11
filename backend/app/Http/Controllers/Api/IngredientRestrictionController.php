<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\IngredientRestriction;
use Illuminate\Http\Request;

class IngredientRestrictionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $ingredientRest = IngredientRestriction::with('ingredient', 'restriction')->get();
        return response()->json(
            [
                'success' => true,
                'message' => 'Data berhasil dimuat',
                'data' => $ingredientRest
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
                'ingredient_id' => 'required|integer|exists:ingredients,id',
                'restriction_id' => 'required|integer|exists:restrictions,id'
            ], 201
        );

        $ingredientRest = IngredientRestriction::create($validated);
        return response()->json(
            [
                'success' => true,
                'message' => "Data berhasil dibuat",
                'data' => $ingredientRest
            ], 201
        );
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $ingredientRest = IngredientRestriction::with(['ingredient', 'restriction'])->findOrFail($id);
        return response()->json(
            [
                'success' => true,
                'message' => "Data dengan id: {$id} berhasil ditemukan",
                'data' => $ingredientRest
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
                'ingredient_id' => 'required|integer|exists:ingredients,id',
                'restriction_id' => 'required|integer|exists:restrictions,id'
            ]
        );

        $ingredientRest = IngredientRestriction::findOrFail($id);
        $ingredientRest->update($validated);

        return response()->json(
            [
                'success' => true,
                'message' => "Data dengan id: {$id} berhasil diupdate",
                'data' => $ingredientRest
            ]
        );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $ingredientRest = IngredientRestriction::findOrFail($id);
        $ingredientRest->delete();

        return response()->json(
            [
                'success' => true,
                'message' => "Data dengan id: {$id} berhasil dihapus",
                'data' => null
            ], 200
        );
    }
}
