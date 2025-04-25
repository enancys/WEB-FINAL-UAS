<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserFavoriteCategory extends Model
{
    use HasFactory;
    protected $table = 'user_favorite_categories';
    protected $primaryKey  = 'id';
    protected $fillable = [
        'user_preference_id',
        'category_id'
    ];

    public function userPreference() {
        return $this->belongsTo(UserPreference::class, 'user_preference_id');
    }

    public function category() {
        return $this->belongsTo(Category::class, 'category_id');
    }
}
