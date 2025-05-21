<?php

use App\Http\Controllers\Web\CategoryController;
use App\Http\Controllers\Web\CategoryFoodController;
use App\Http\Controllers\Web\CuisineController;
use App\Http\Controllers\Web\CuisineFoodController;
use App\Http\Controllers\Web\FoodController;
use App\Http\Controllers\Web\FoodTagController;
use App\Http\Controllers\Web\IngredientController;
use App\Http\Controllers\Web\FoodIngredientController;
use App\Http\Controllers\Web\IngredientRestrictionController;
use App\Http\Controllers\Web\RatingController;
use App\Http\Controllers\Web\RestaurantController;
use App\Http\Controllers\Web\RestaurantFoodController;
use App\Http\Controllers\Web\RestrictionController;
use App\Http\Controllers\Web\TagController;
use App\Http\Controllers\Web\UserController;
use App\Http\Controllers\Web\UserDietaryRestrictionController;
use App\Http\Controllers\Web\UserDislikedIngredientController;
use App\Http\Controllers\Web\UserFavoriteCategoryController;
use App\Http\Controllers\Web\UserFavoriteCuisineController;
use App\Http\Controllers\Web\UserFavoriteIngredientController;
use App\Http\Controllers\Web\UserPreferenceController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::resource('categories', CategoryController::class);
Route::resource('category_foods', CategoryFoodController::class);
Route::resource('cuisines', CuisineController::class);
Route::resource('cuisine_foods', CuisineFoodController::class);
Route::resource('foods', FoodController::class);
Route::resource('food_ingredients', FoodIngredientController::class);
Route::resource('food_tags', FoodTagController::class);
Route::resource('ingredients', IngredientController::class);
Route::resource('ingredient_restrictions', IngredientRestrictionController::class);
Route::resource('ratings', RatingController::class);
Route::resource('restaurants', RestaurantController::class);
Route::resource('restaurant_foods', RestaurantFoodController::class);
Route::resource('restrictions', RestrictionController::class);
Route::resource('tags', TagController::class);
Route::resource('users', UserController::class);
Route::resource('user_dietary_restrictions', UserDietaryRestrictionController::class);
Route::resource('user_disliked_ingredients', UserDislikedIngredientController::class);
Route::resource('user_favorite_categories', UserFavoriteCategoryController::class);
Route::resource('user_favorite_cuisines', UserFavoriteCuisineController::class);
Route::resource('user_favorite_ingredients', UserFavoriteIngredientController::class);
Route::resource('user_preferences', UserPreferenceController::class);
