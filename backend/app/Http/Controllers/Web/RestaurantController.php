<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Restaurant;
use Illuminate\Http\Request;

class RestaurantController extends Controller
{
    public function index() {
        $restaurant = Restaurant::all();
        return view('Restaurants.RestaurantsIndex', compact('restaurant'));
    }

    public function create() {
        return view('Restaurants.RestaurantsCreate');
    }

    public function store(Request $request) {
        $request->validate([
            'name' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'phone' => 'required|string|max:255',
            'website_url' => 'required|string|max:255',
            'opening_hours' => 'required|string',
            'cuisine_id' => 'required|integer|exists:cuisines,id',
            'rating' => 'required|numeric',
            'description' => 'required|string|max:255',
            'image_url' => 'required|string|max:255',
        ]);

        $restaurant = restaurant::create([
            'name' => $request->name,
            'location' => $request->location,
            'phone' => $request->phone,
            'website_url' => $request->website_url,
            'opening_hours' => $request->opening_hours,
            'cuisine_id' => $request->cuisine_id,
            'rating' => $request->rating,
            'description' => $request->description,
            'image_url' => $request->image_url,

        ]);
        return redirect('restaurants')->with('success', 'Restaurant Berhasil Dibuat');
    }

    public function edit($id) {
        $restaurant = Restaurant::findOrFail($id);
        return view('Restaurants.RestaurantsEdit', compact('restaurant'));
    }

    public function update(Request $request, $id) {
        $request->validate([
            'name' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'phone' => 'required|string|max:255',
            'website_url' => 'required|string|max:255',
            'opening_hours' => 'required|string',
            'cuisine_id' => 'required|integer|exists:cuisines,id',
            'rating' => 'required|numeric',
            'description' => 'required|string|max:255',
            'image_url' => 'required|string|max:255',
        ]);

        $restaurant = Restaurant::findOrFail($id);
        $restaurant->update([
            'name' => $request->name,
            'location' => $request->location,
            'phone' => $request->phone,
            'website_url' => $request->website_url,
            'opening_hours' => $request->opening_hours,
            'cuisine_id' => $request->cuisine_id,
            'rating' => $request->rating,
            'description' => $request->description,
            'image_url' => $request->image_url,

        ]);
        return redirect('restaurants')->with('success', 'Restaurant Berhasil Diperbarui');
    }

    public function destroy($id){
        $restaurant = Restaurant::findOrFail($id);
        $restaurant->delete();
        return redirect('restaurants')->with('success', 'restaurant Berhasil Dihapus');
    }
}
