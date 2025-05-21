<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Tag;
use Illuminate\Http\Request;

class TagController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tag = Tag::all();
        return response()->json(
            [
                'success' => true,
                'message' => "Data Berhasil Dimuat",
                'data' => $tag
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
        $tag = Tag::create($validated);
        return response()->json(
            [
                'success' => true,
                'message' => "Data Berhasil Dibuat",
                'data' => $tag
            ], 201
        );
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $tag = Tag::findOrFail($id);
        return response()->json(
            [
                'success' => true,
                'message' => "Data Dengan ID {$id} Berhasil Dimuat",
                'data' => $tag
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
        $tag = Tag::findOrFail($id);
        $tag->update($validated);
        return response()->json(
            [
                'success' => true,
                'message' => "Data Dengan ID {$id} Berhasil Diupdate",
                'data' => $tag
            ], 200
        );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $tag = Tag::findOrFail($id);
        $tag->delete();
        
        return response()->json(
            [
                'success' => true,
                'message' => "Data Dengan ID {$id} Berhasil Dihapus",
                'data' => null
            ], 200
        );

    }
}
