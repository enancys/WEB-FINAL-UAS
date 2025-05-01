<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\UserPreference;
use Illuminate\Http\Request;

class UserPreferenceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $userPreference = UserPreference::with('user')->get();
        return response()->json($userPreference, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|integer|exists:users,id'
        ]);
        $userPreference = UserPreference::create($validated);
        return response()->json($userPreference, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $userPreference = UserPreference::findOrFail($id);
        return response()->json($userPreference, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validated = $request->validate([
            'user_id' => 'required|integer|exists:users,id'
        ]);
        $userPreference = UserPreference::findOrFail($id);
        $userPreference->update($validated);
        return response()->json($userPreference, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $userPreference = UserPreference::findOrFail($id);
        $userPreference->delete();
        return response()->json(['message' => 'UserPreference berhasil Dihapus']);
    }

    public function getByUser($userId)
    {
        $preferences = UserPreference::where('user_id', $userId)->first();

        if (!$preferences) {
            $preferences = UserPreference::create([
                'user_id' => $userId,
            ]);
            return response()->json([
                'message' => 'User preferences not found, a new entry has been created.',
                'preferences' => $preferences
            ], 201); 
        }

        return response()->json($preferences);
    }
}
