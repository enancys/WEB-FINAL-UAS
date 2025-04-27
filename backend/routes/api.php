<?php

use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\CuisineController;
use App\Http\Controllers\Api\FoodController;
use App\Http\Controllers\Api\FoodIngredientController;
use App\Http\Controllers\Api\FoodTagController;
use App\Http\Controllers\Api\IngredientController;
use App\Http\Controllers\Api\RatingController;
use App\Http\Controllers\Api\RestaurantController;
use App\Http\Controllers\Api\RestaurantFoodController;
use App\Http\Controllers\Api\RestrictionController;
use App\Http\Controllers\Api\TagController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\UserDietaryResctrictionController;
use App\Http\Controllers\Api\UserDislikedIngredientController;
use App\Http\Controllers\Api\UserFavoriteCategoryController;
use App\Http\Controllers\Api\UserFavoriteCuisineController;
use App\Http\Controllers\Api\UserFavoriteIngredientController;
use App\Http\Controllers\Api\UserPreferenceController;
use App\Models\UserDietaryResctriction;
use App\Models\UserFavoriteCategory;
use App\Models\UserFavoriteCuisine;
use App\Models\UserPreference;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::apiResource('categories', CategoryController::class);
Route::apiResource('cuisines', CuisineController::class);
Route::apiResource('foods', FoodController::class);
Route::apiResource('food_ingredients', FoodIngredientController::class);
Route::apiResource('food_tags', FoodTagController::class);
Route::apiResource('ingredients', IngredientController::class);
Route::apiResource('ratings', RatingController::class);
Route::apiResource('restaurants', RestaurantController::class);
Route::apiResource('restaurant_foods', RestaurantFoodController::class);
Route::apiResource('restrictions', RestrictionController::class);
Route::apiResource('tags', TagController::class);
Route::apiResource('users', UserController::class);
Route::apiResource('user_preferences', UserPreferenceController::class);
Route::apiResource('user_dietary_resctrictions', UserDietaryResctrictionController::class);
Route::apiResource('user_disliked_ingredients', UserDislikedIngredientController::class);
Route::apiResource('user_favorite_category', UserFavoriteCategoryController::class);
Route::apiResource('user_favorite_cuisines', UserFavoriteCuisineController::class);
Route::apiResource('user_favorite_ingredients', UserFavoriteIngredientController::class);