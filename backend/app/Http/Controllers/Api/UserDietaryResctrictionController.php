<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\UserDietaryResctriction;
use Illuminate\Http\Request;

class UserDietaryResctrictionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $userDietaryResctriction = UserDietaryResctriction::with(['userPreference.user', 'restriction'])->get();
        return response()->json(
            [
                'success' => true,
                'message' => "Data Berhasil Dimuat",
                'data' => $userDietaryResctriction
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
            'restriction_id' => 'required|integer|exists:restrictions,id'
        ]);

        $userDietaryResctriction = UserDietaryResctriction::create($validated);
        return response()->json(
            [
                'success' => true,
                'message' => "Data Berhasil Dibuat",
                'data' => $userDietaryResctriction
            ], 201
        );
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $userDietaryResctriction = UserDietaryResctriction::findOrFail($id);
        return response()->json(
            [
                'success' => true,
                'message' => "Data Dengan ID {$id} Berhasil Dimuat",
                'data' => $userDietaryResctriction
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
            'restriction_id' => 'required|integer|exists:restrictions,id'
        ]);

        $userDietaryResctriction = UserDietaryResctriction::findOrFail($id);
        $userDietaryResctriction->update($validated);
        return response()->json(
            [
                'success' => true,
                'message' => "Data Dengan ID {$id} Berhasil Diupdate",
                'data' => $userDietaryResctriction
            ], 200
        );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $userDieataryResctriction = UserDietaryResctriction::findOrFail($id);
        $userDieataryResctriction->delete();
        return response()->json(
            [
                'success' => true,
                'message' => "Data Dengan ID {$id} Berhasil Dihapus",
                'data' => null
            ], 200
        );
    }
}
