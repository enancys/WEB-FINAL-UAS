<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Cuisine;
use Illuminate\Http\Request;

class CuisineController extends Controller
{
    public function index() {
        $cuisine = Cuisine::all();
        return view('Cuisine.CuisineIndex', compact('cuisine'));
    }

    public function create() {
        return redirect('Cuisine.CuisineCreate');
    }

    public function store(Request $request) {
        $request->validate([
            'name' => 'required|string'
        ]);

        $cuisine = Cuisine::create([
            'name' => $request->name
        ]);

        return redirect('cuisines')->with('success', 'Cuisines Berhasil Dibuat');
    }

    public function edit($id) {
        $cuisine = Cuisine::findOrFail($id);
        return view('Cuisine.CuisineEdit', compact('cuisine'));
    }

    public function update(Request $request, $id) {
        $request->validate([
            'name' => 'required|string'
        ]);

        $cuisine = Cuisine::findOrFail($id);
        $cuisine->update([
            'name' => $request->name
        ]);

        return redirect('cuisines')->with('success', 'Cuisine Berhasil Diperbarui');
    }

    public function destroy($id) {
        $cuisine = Cuisine::findOrFail($id);
        $cuisine->delete();
        return redirect('cuisines')->with('success', 'Cuisine Berhasil Dihapus');
    }
}
