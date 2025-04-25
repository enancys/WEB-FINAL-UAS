<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RestaurantFood extends Model
{
    use HasFactory;
    protected $table = 'restaurant_foods';
    protected $primaryKey  = 'id';
    protected $fillable = [
        'restaurant_id',
        'food_id',
        'price'
    ];

    public function food()
    {
        return $this->belongsTo(Food::class, 'food_id');
    }

    public function restaurant()
    {
        return $this->belongsTo(Restaurant::class, 'restaurant_id');
    }
}
