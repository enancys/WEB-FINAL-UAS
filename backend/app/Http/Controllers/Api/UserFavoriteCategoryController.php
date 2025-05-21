<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\UserFavoriteCategory;
use Illuminate\Http\Request;

class UserFavoriteCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $userFavoriteCategory = UserFavoriteCategory::with('userPreference.user', 'category')->get();
        return response()->json(
            [
                'success' => true,
                'message' => "Data Berhasil Dimuat",
                'data' => $userFavoriteCategory
            ], 200
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_preference_id' => 'required|integer|exists:user_preferences,id',
            'category_id' => 'required|integer|exists:categories,id'
        ]);
        $userFavoriteCategory = UserFavoriteCategory::create($validated);
        return response()->json(
            [
                'success' => true,
                'message' => "Data Berhasil Dimuat",
                'data' => $userFavoriteCategory
            ], 201
        );
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $userFavoriteCategory = UserFavoriteCategory::findOrFail($id);
        return response()->json(
            [
                'success' => true,
                'message' => "Data Dengan ID {$id} Berhasil Dimuat",
                'data' => $userFavoriteCategory
            ], 200
        );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validated = $request->validate([
            'user_preference_id' => 'required|integer|exists:user_preferences,id',
            'category_id' => 'required|integer|exists:categories,id'
        ]);
        $userFavoriteCategory = UserFavoriteCategory::findOrFail($id);
        $userFavoriteCategory->update($validated);
        return response()->json(
            [
                'success' => true,
                'message' => "Data Dengan ID {$id} Berhasil Diupdate",
                'data' => $userFavoriteCategory
            ], 200
        );
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $userFavoriteCategory = UserFavoriteCategory::findOrFail($id);
        $userFavoriteCategory->delete();
        return response()->json(
            [
                'success' => true,
                'message' => "Data Dengan ID {$id} Berhasil Dihapus",
                'data' => null
            ], 200
        );
    }

    
}
