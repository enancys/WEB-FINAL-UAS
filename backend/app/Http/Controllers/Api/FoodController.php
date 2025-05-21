<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Cuisine;
use App\Models\Food;
use App\Models\Ingredient;
use App\Models\Restriction;
use App\Models\UserDietaryResctriction;
use App\Models\UserDislikedIngredient;
use App\Models\UserFavoriteCategory;
use App\Models\UserFavoriteCuisine;
use App\Models\UserFavoriteIngredient;
use App\Models\UserPreference;
use Illuminate\Http\Request;

class FoodController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $food = Food::with('restaurant', 'cuisine', 'ingredients')->get();
        return response()->json(
            [
                'success' => true,
                'message' => 'Data Food Berhasil dimuat',
                'data' => $food
            ], 200
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'description' => 'required|string',
            'price' => 'required|numeric',
            'image_url' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'restaurant_id' => 'required|integer|exists:restaurants,id',
            'cuisine_id' => 'required|integer|exists:cuisines,id'
        ]);

        if ($request->hasFile('image_url')) {
            $path = $request->file('image_url')->store('foods', 'public');
            $validated['image_url'] = '/storage/' . $path;
        }

        $food = Food::create($validated);

        return response()->json(
            [
                'success' => true,
                'message' => 'Data Food Berhasil dibuat',
                'data' => $food
            ], 201
        );
        
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $food = Food::findOrFail($id);
        
        return response()->json(
            [
                'success' => true, 
                'message' => "Data Food ID {$id} Berhasil dimuat",
                'data' => $food
            ], 200
        );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'description' => 'required|string',
            'price' => 'required|numeric',
            'image_url' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'restaurant_id' => 'required|integer|exists:restaurants,id',
            'cuisine_id' => 'required|integer|exists:cuisines,id'
        ]);

        if ($request->hasFile('image_url')) {
            $path = $request->file('image_url')->store('foods', 'public');
            $validated['image_url'] = '/storage/' . $path;
        }

        $food = Food::findOrFail($id);
        $food->update($validated);
        return response()->json(
            [
                'success' => true, 
                'message' => "Data Food ID {$id} Berhasil Diupdate",
                'data' => $food
            ], 200
        );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $food = Food::findOrFail($id);
        $food->delete();
        return response()->json(
            [
                'success' => true, 
                'message' => "Data Food ID {$id} Berhasil dihapus",
                'data' => null
            ], 200
        );
    }

public function getRecomendation(string $id) {

    $favIngredientIds = UserFavoriteIngredient::where('user_preference_id', $id)->pluck('ingredient_id');
    $disIngredientIds = UserDislikedIngredient::where('user_preference_id', $id)->pluck('ingredient_id');
    $favCategoryIds = UserFavoriteCategory::where('user_preference_id', $id)->pluck('category_id');
    $favCuisineIds = UserFavoriteCuisine::where('user_preference_id', $id)->pluck('cuisine_id');
    $dieteryRestrictions = UserDietaryResctriction::where('user_preference_id', $id)->pluck('restriction_id');

    $favIngredients = Ingredient::whereIn('id', $favIngredientIds)->pluck('name');
    $disIngredients = Ingredient::whereIn('id', $disIngredientIds)->pluck('name');
    $favCategories = Category::whereIn('id', $favCategoryIds)->pluck('name');
    $favCuisines = Cuisine::whereIn('id', $favCuisineIds)->pluck('name');

    $ingredientRestrictions = Restriction::whereIn('id', $dieteryRestrictions)
        ->with('ingredients')
        ->get()
        ->pluck('ingredients')
        ->flatten()
        ->unique('id');

    $restrictedIngredientNames = $ingredientRestrictions->pluck('name');
    $restrictedIngredientIds = $ingredientRestrictions->pluck('id')->toArray();

    $recomenFoods = Food::with('restaurant', 'cuisine', 'ingredients', 'category')
        ->when($favIngredientIds->isNotEmpty(), function($query) use ($favIngredientIds) {
            $query->whereHas('ingredients', function ($q) use ($favIngredientIds) {
                $q->whereIn('ingredients.id', $favIngredientIds);
            });
        })
        ->when($favCuisineIds->isNotEmpty(), function ($query) use ($favCuisineIds) {
            $query->whereHas('cuisine', function($q) use ($favCuisineIds) {
                $q->whereIn('cuisines.id', $favCuisineIds);
            });
        })
        ->when($favCategoryIds->isNotEmpty(), function($query) use ($favCategoryIds) {
            $query->whereHas('category', function ($q) use ($favCategoryIds) {
                $q->whereIn('categories.id', $favCategoryIds);
            });
        })
        ->when($disIngredientIds->isNotEmpty(), function($query) use ($disIngredientIds) {
            $query->whereDoesntHave('ingredients', function($q) use ($disIngredientIds) {
                $q->whereIn('ingredients.id', $disIngredientIds);
            });
        })
        ->when(!empty($restrictedIngredientIds), function($query) use ($restrictedIngredientIds) {
            $query->whereDoesntHave('ingredients', function ($q) use ($restrictedIngredientIds) {
                $q->whereIn('ingredients.id', $restrictedIngredientIds);
            });
        })
        ->get();

        return response()->json([
            'user_fav_ingredients' => $favIngredients,
            'user_disliked_ingredients' => $disIngredients,
            'ingredient_restrictions' => $restrictedIngredientNames,
            'user_fav_categories' => $favCategories,
            'user_fav_cuisines' => $favCuisines,
            'recommendations' => $recomenFoods,
        ]);
    }   

}
