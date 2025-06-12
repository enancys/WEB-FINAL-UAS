<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Restaurant extends Model
{
    use HasFactory;

    protected $table = 'restaurants';
    protected $primaryKey  = 'id';
    protected $fillable = [
        'name',
        'location',
        'phone', 
        'website_url',
        'opening_hours',
        'cuisine_id',
        'rating',
        'description',
        'image_url',
        'user_id',
    ];

    public function food() {
        return $this->belongsToMany(Food::class, 'restaurant_foods', 'restaurant_id', 'food_id');
    }

    public function cuisine() {
        return $this->belongsTo(Cuisine::class);
    }
    public function user() {
        return $this->belongsTo(User::class);
    }
}
