<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserFavoriteIngredient extends Model
{
    use HasFactory;
    protected $table = 'user_favorite_ingredients';
    protected $primaryKey  = 'id';
    protected $fillable = [
        'user_preference_id',
        'ingredient_id'
    ];

    public function userPreference() {
        return $this->belongsTo(UserPreference::class, 'user_preference_id');
    }
    public function ingredient(){
        return $this->belongsTo(Ingredient::class, 'ingredient_id');
    }
}
