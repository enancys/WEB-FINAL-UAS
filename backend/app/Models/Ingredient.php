<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ingredient extends Model
{
    use HasFactory;

    protected $table = 'ingredients';
    protected $primaryKey  = 'id';
    protected $fillable = [
        'name'
    ];

    public function food() {
        return $this->belongsToMany(Food::class, 'food_ingredients');
    }
    public function userDietaryResctriction() {
        return $this->belongsToMany(User::class, 'user_dietary_restrictions');
    }
    // public function userDislikedIngredient() {
    //     return $this->belongsToMany(User::class, 'user_disliked_ingredients');
    // }

// Pivot Fav_Category_Ingredients
    public function favCategoryIngredient() {
        return $this->belongsToMany(User::class, 'user_favorite_ingredients');
    }

    // Pivot Table User_Disliked_Ingredients
    public function userDislikedIngredient() {
        return $this->belongsToMany(User::class, 'user_disliked_ingredients');
    }
}
