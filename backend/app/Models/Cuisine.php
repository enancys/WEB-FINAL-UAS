<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cuisine extends Model
{
    use HasFactory;
    protected $table = 'cuisines';
    protected $primaryKey  = 'id';
    protected $fillable = [
        'name',
        'description'
    ];

    public function food() {
        return $this->hasMany(Food::class);
    }
    public function userFavoriteCuisine() {
        return $this->belongsToMany(User::class, 'user_favorite_cuisines');
    }
}
