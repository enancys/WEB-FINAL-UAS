<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index() {
        $category = Category::all();
        return view('Category.CategoryIndex', compact('category'));
    }

    public function create() {
        return view('Category.CategoryCreate');
    }

    public function store(Request $request) {
        $request->validate([
            'name' => 'required|string',
        ]);

        $category = Category::create([
            'name' => $request->name,
        ]);

        return redirect('categories')->with('success', 'Category berhasil ditambahkan');
    }

    public function edit($id) {
        $category = Category::findOrFail($id);
        return view('Category.CategoryEdit', compact('category'));
    }

    public function update(Request $request, $id) {
        $request->validate([
            'name' => 'required|string',
        ]);
        $category = Category::findOrFail($id);
        $category->update([
            'name' => $request->name,
        ]);
        return redirect('/categories')->with('success', 'Ketegori berhasil diperbarui');
    }
    public function destroy($id) {
        $category = Category::findOrFail($id);
        $category->delete();

        return redirect('/categories')->with('success', 'Kategori berhasil dihapus'); 
    }
}
