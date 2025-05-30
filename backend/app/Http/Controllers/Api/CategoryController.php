<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $category = Category::all();

        return response()->json([
            'success' => true,
            'message' => 'Data Berhasil Dimuat',
            'data' => $category
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string',
        ]);
        $category = Category::create($validated);
        return response()->json([
            'success' => true,
            'message' => 'Data berhasil dibuat',
            'data' => $category
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $category = Category::findOrFail($id);
        return response()->json([
            'succsess' => true,
            'message' => "Data dengan ID {$id}, Berhasil ditemukan",
            'data' => $category
        ], 200);
        
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validated = $request->validate([
            'name' => 'required|string',
        ]);
    
        $category = Category::findOrFail($id);
        $category->update($validated);
    
        return response()->json(
            [
                'success' => true,
                'message' => "Data dengan ID {$id} Berhasil Ditemukan",
                'data' => $category
            ], 200
        );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $category = Category::findOrFail($id);
        $category->delete();  
        return response()->json(
            [
                'success' => true,
                'message' => 'Kategori berhasil dihapus',
                'data' => $category
            ], 200
        );
    }
}
