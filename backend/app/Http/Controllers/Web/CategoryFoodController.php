<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\CategoryFood;
use Illuminate\Http\Request;

class CategoryFoodController extends Controller
{
    public function index() {
        $categoryFoods = CategoryFood::all();
        return view('CategoryFoods.CategoryFoodsIndex', compact('categoryFoods'));
    }

    public function create() {
        return view('CategoryFoods.CategoryFoodsCreate');
    }

    public function store(Request $request) {
        $request->validate([
            'food_id' => 'required|integer|exists:foods,id',
            'category_id' => 'required|integer|exists:categories,id'
        ]);

        CategoryFood::create([
            'food_id' => $request->food_id,
            'category_id' => $request->category_id
        ]);

        return redirect('category_foods')->with('success', 'Category Foods Berhasil Dibuat');
    }

    public function edit($id) {
        $categoryFoods = CategoryFood::findOrFail($id);
        return view('CategoryFoods.CategoryFoodsEdit', compact('categoryFoods'));
    }

    public function update(Request $request ,$id) {
        $request->validate([
            'food_id' => 'required|integer|exists:foods,id',
            'category_id' => 'required|integer|exists:categories,id'
        ]);

        $categoryFoods = CategoryFood::findOrFail($id);
        $categoryFoods->update([
            'food_id' => $request->food_id,
            'category_id' => $request->category_id
        ]);
        return redirect('categoy_foods')->with('success', 'Category Foods Berhasil Diperbarui');

    }
    public function destroy($id) {
        $categoryFoods = CategoryFood::findOrFail($id);
        $categoryFoods->delete();
        return redirect('category_foods')->with('success', 'Category Foods Berhasil Dihapus');
    }

}
