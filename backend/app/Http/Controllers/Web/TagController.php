<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Tag;
use Illuminate\Http\Request;

class TagController extends Controller
{
    
    public function index() {
        $tag = Tag::all();
        return view('Tags.TagsIndex', compact('tag'));
    }

    public function create() {
        return view('Tags.TagsCreate');
    }

    public function store(Request $request) {
        $request->validate([
            'name' => 'required|string',
        ]);

        $tag = Tag::create([
            'name' => $request->name,
        ]);

        return redirect('tags')->with('success', 'Tag berhasil ditambahkan');
    }

    public function edit($id) {
        $tag = Tag::findOrFail($id);
        return view('Tags.TagsEdit', compact('tag'));
    }

    public function update(Request $request, $id) {
        $request->validate([
            'name' => 'required|string',
        ]);
        $tag = Tag::findOrFail($id);
        $tag->update([
            'name' => $request->name,
        ]);
        return redirect('tags')->with('success', 'Tag berhasil diperbarui');
    }
    public function destroy($id) {
        $tag = Tag::findOrFail($id);
        $tag->delete();

        return redirect('tags')->with('success', 'Tag berhasil dihapus'); 
    }
}
