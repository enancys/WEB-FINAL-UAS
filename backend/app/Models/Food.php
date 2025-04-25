<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Food extends Model
{
    use HasFactory;

    protected $table = 'foods';
    protected $primaryKey  = 'id';
    protected $fillable = [
        'name',
        'description',
        'price',
        'image_url',
        'restaurant_id',
        'cuisine_id'
    ];

    public function ingredient() {
        return $this->belongsToMany(Ingredient::class, 'food_ingredients')->withPivot('quantity', 'unit');
    }

    public function restaurant(){
        return $this->belongsToMany(Restaurant::class, 'restaurant_foods', 'food_id', 'restaurant_id');
    }

    // public function tags() {
    //     return $this->belongsToMany(Tag::class, 'foods_tags');
    // }

    public function cuisine() {
        return $this->belongsTo(Cuisine::class);
    }

    public function rating() {
        return $this->hasMany(Rating::class);
    }

    // Tags Foods
    public function tag()  {
        return $this->belongsToMany(
            Tag::class, 
            'food_tags', 
            'food_id', 
            'tag_id'
        );
    }
}
