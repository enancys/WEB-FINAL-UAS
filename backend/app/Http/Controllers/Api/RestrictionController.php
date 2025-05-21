<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Restriction;
use Illuminate\Http\Request;

class RestrictionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $restriction = Restriction::all();
        return response()->json(
            [
                'success' => true,
                'message' => "Data Berhasil Dimuat",
                'data' => $restriction
            ], 200
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string'
        ]);
        $restriction = Restriction::create($validated);
        return response()->json(
            [
                'success' => true,
                'message' => "Data Berhasil Dibuat",
                'data' => $restriction
            ], 201
        );
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $restriction = Restriction::findOrFail($id);
        return response()->json(
            [
                'success' => true,
                'message' => "Data Dengan ID {$id} Berhasil Dimuat",
                'data' => $restriction
            ], 200
        );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validated = $request->validate([
            'name' => 'required|string'
        ]);
        $restriction = Restriction::findOrFail($id);
        $restriction->update($restriction);
        return response()->json(
            [
                'success' => true,
                'message' => "Data Dengan ID {$id} Berhasil Diupdate",
                'data' => $restriction
            ], 200
        );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $restriction = Restriction::findOrFail($id);
        $restriction->delete();
        return response()->json(
            [
                'success' => true,
                'message' => "Data Dengan ID {$id} Berhasil Dihapus",
                'data' => null
            ], 200
        );
    }
}
