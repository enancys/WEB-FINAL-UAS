<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\UserFavoriteCuisine;
use Illuminate\Http\Request;

class UserFavoriteCuisineController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $userFavoriteCuisine = UserFavoriteCuisine::with('userPreference.user', 'cuisine')->get();
        return response()->json(
            [
                'success' => true,
                'message' => "Data Berhasil Dimuat",
                'data' => $userFavoriteCuisine
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
            'cuisine_id' => 'required|integer|exists:cuisines,id'
        ]);

        $userFavoriteCuisine = UserFavoriteCuisine::create($validated);
        return response()->json(
            [
                'success' => true,
                'message' => "Data Berhasil Dibuat",
                'data' => $userFavoriteCuisine
            ], 201
        );
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $userFavoriteCuisine = UserFavoriteCuisine::findOrFail($id);
        return response()->json(
            [
                'success' => true,
                'message' => "Data Dengan ID {$id} Berhasil Dimuat",
                'data' => $userFavoriteCuisine
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
            'cuisine_id' => 'required|integer|exists:cuisines,id'
        ]);
        $userFavoriteCuisine = UserFavoriteCuisine::findOrFail($id);
        $userFavoriteCuisine->update($validated);
        return response()->json(
            [
                'success' => true,
                'message' => "Data Dengan ID {$id} Berhasil Diupdate",
                'data' => $userFavoriteCuisine
            ], 200
        );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $userFavoriteCuisine = UserFavoriteCuisine::findOrFail($id);
        $userFavoriteCuisine->delete();
        return response()->json(
            [
                'success' => true,
                'message' => "Data Dengan ID {$id} Berhasil Dihapus",
                'data' => null
            ], 200
        );
    }
}
