<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\FoodTag;
use Illuminate\Http\Request;

class FoodTagController extends Controller
{
    public function index() {
        $foodTag = FoodTag::all();
        return view('FoodTags.FoodTagsIndex', compact('foodTag'));
    }

    public function create() {
        return view('FoodTags.FoodTagsCreate');
    }

    public function store(Request $request) {
        $request->validate([
            'food_id' => 'required|integer|exists:foods,id',
            'tag_id' => 'required|integer|exists:tags,id'
        ]);
        $foodTag = FoodTag::create([
            'food_id' => $request->food_id,
            'tag_id' => $request->tag_id
        ]);
        return redirect('food_tags')->with('success', 'Food Tag Berhasil Dibuat');
    }

    public function edit($id) {
        $foodTag = FoodTag::findOrFail($id);
        return view('FoodTags.FoodTagsEdit', compact('foodTag'));
    }

    public function update(Request $request, $id) {
        $request->validate([
            'food_id' => 'required|integer|exists:foods,id',
            'tag_id' => 'required|integer|exists:tags,id'
        ]);
        $foodTag = FoodTag::findOrFail($id);
        $foodTag->update([
            'food_id' => $request->food_id,
            'tag_id' => $request->tag_id
        ]);

        return redirect('food_tags')->with('success', 'Food Tag Berhasil Diupdate');

    }

    public function destroy($id) {
        $foodTag = FoodTag::findOrFail($id);
        $foodTag->delete();
        return redirect('food_tags')->with('success', 'Food Tags Berhasil Dihapus');
    }
}
