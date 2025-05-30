<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Cuisine;
use Illuminate\Http\Request;

class CuisineController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $cuisine = Cuisine::all();
        return response()->json(
            [
                'success' => true,
                'message' => 'Data Cuisine berhasil Dimuat',
                'data' => $cuisine
            ], 200
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'description' => 'required|string'
        ]);
        $cuisine = Cuisine::create($validated);
        return response()->json(
            [
                'success' => true,
                'message' => 'Data Cuisine berhasil Dibuat',
                'data' => $cuisine
            ], 201
        );
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $cuisine = Cuisine::findOrFail($id);
        return response()->json(
            [
                'success' => true,
                'message' => "Data Cuisine ID {$id}berhasil dimuat",
                'data' => $cuisine
            ], 200
        );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'description' => 'required|string'
        ]);
    
        $cuisine = Cuisine::findOrFail($id);
        $cuisine->update($validated);
    
        return response()->json(
            [
                'success' => true,
                'message' => "Data Cuisine ID {$id}berhasil diupdate",
                'data' => $cuisine
            ], 200
        );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $cuisine = Cuisine::findOrFail($id);
        $cuisine->delete(); 

        return response()->json(
            [
                'success' => true,
                'message' => "Data Cuisine ID {$id}berhasil dihapus",
                'data' => null
            ], 200
        );
    }
}
