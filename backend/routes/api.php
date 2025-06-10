<?php

use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\CategoryFoodController;
use App\Http\Controllers\Api\CuisineController;
use App\Http\Controllers\Api\CuisineFoodController;
use App\Http\Controllers\Api\FoodController;
use App\Http\Controllers\Api\FoodIngredientController;
use App\Http\Controllers\Api\FoodTagController;
use App\Http\Controllers\Api\IngredientController;
use App\Http\Controllers\Api\IngredientRestrictionController;
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
use App\Http\Controllers\AuthController;
use App\Models\User;
use App\Models\UserDietaryResctriction;
use App\Models\UserFavoriteCategory;
use App\Models\UserFavoriteCuisine;
use App\Models\UserPreference;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
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

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });
Route::middleware('auth:sanctum')->get('/me', function (Request $request) {
    $user = $request->user();
    return response()->json([
        'user' => [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'user_preference_id' => $user->userPreference?->id,
            'seller' => $user->seller, 
        ]
    ]);
});


// Route::post('/login', [AuthController::class, 'login']);
Route::post('/login', function (Request $request) {
    $validated = $request->validate([
        'email' => 'required|email',
        'password' => 'required',
    ]);

    $user = User::where('email', $validated['email'])->first();

    if (!$user || !Hash::check($validated['password'], $user->password)) {
        return response()->json(['message' => 'Invalid credentials'], 401);
    }

    return response()->json([
        'token' => $user->createToken('YourAppName')->plainTextToken,
        'user' => $user
    ]);
});
Route::post('/register', [AuthController::class, 'register']);

Route::apiResource('categories', CategoryController::class);
Route::apiResource('category_food', CategoryFoodController::class);
Route::apiResource('cuisines', CuisineController::class);
Route::apiResource('cuisine_food', CuisineFoodController::class);
Route::apiResource('foods', FoodController::class);
Route::apiResource('food_ingredients', FoodIngredientController::class);
Route::apiResource('food_tags', FoodTagController::class);
Route::apiResource('ingredients', IngredientController::class);
Route::apiResource('ingredient_restrictions', IngredientRestrictionController::class);
Route::apiResource('ratings', RatingController::class);
Route::apiResource('restaurants', RestaurantController::class);
Route::apiResource('restaurant_foods', RestaurantFoodController::class);
Route::apiResource('restrictions', RestrictionController::class);
Route::apiResource('tags', TagController::class);
Route::apiResource('users', UserController::class);
Route::apiResource('user_preferences', UserPreferenceController::class);
Route::get('/user_preferences/by_user/{userId}', [UserPreferenceController::class, 'getByUser']);
Route::apiResource('user_dietary_resctrictions', UserDietaryResctrictionController::class);
Route::apiResource('user_disliked_ingredients', UserDislikedIngredientController::class);
Route::apiResource('user_favorite_category', UserFavoriteCategoryController::class);
Route::apiResource('user_favorite_cuisines', UserFavoriteCuisineController::class);
Route::apiResource('user_favorite_ingredients', UserFavoriteIngredientController::class);
Route::get('recomendation/{id}', [FoodController::class, 'getRecomendation']);