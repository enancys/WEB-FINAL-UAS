<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Rating;
use Illuminate\Http\Request;

class RatingController extends Controller
{
    public function index() {
    $rating = Rating::all();
    return view('Ratings.RatingsIndex', compact('rating'));
    }

    public function create() {
        return view('Ratings.RatingsCreate');
    }

    public function store(Request $request) {
        $request->validate([
            'user_id' => 'required|integer|exists:users,id',
            'food_id' => 'required|integer|exists:foods,id',
            'restaurant_id' => 'required|integer|exists:restaurants,id',
            'rating' => 'required|numeric',
            'review' => 'required|string',
            'image_url' => 'required|string'
        ]);

        $rating = Rating::create([
            'user_id' => $request->user_id,
            'food_id' => $request->food_id,
            'restaurant_id' => $request->restaurant_id,
            'rating' => $request->rating,
            'review' => $request->review,
            'image_url' => $request->image_url
        ]);

        return redirect('ratings')->with('success', 'Rating Berhasil Dibuat');

    }

    public function edit($id) {
        $rating = Rating::findOrFail($id);
        return view('Ratings.RatingsEdit', compact('rating'));
    }

    public function update(Request $request, $id) {
        $request->validate([
            'user_id' => 'required|integer|exists:users,id',
            'food_id' => 'required|integer|exists:foods,id',
            'restaurant_id' => 'required|integer|exists:restaurants,id',
            'rating' => 'required|numeric',
            'review' => 'required|string',
            'image_url' => 'required|string'
        ]);

        $rating = Rating::findOrFail($id);
        $rating->update([
            'user_id' => $request->user_id,
            'food_id' => $request->food_id,
            'restaurant_id' => $request->restaurant_id,
            'rating' => $request->rating,
            'review' => $request->review,
            'image_url' => $request->image_url
        ]);


        return redirect('ratings')->with('success', 'rating Berhasil Diperbarui');
    }

    public function destroy($id){
        $rating = Rating::findOrFail($id);
        $rating->delete();
        return redirect('Ratings')->with('success', 'rating Berhasil Dihapus');
    }
}
