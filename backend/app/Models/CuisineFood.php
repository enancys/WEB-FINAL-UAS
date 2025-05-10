<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CuisineFood extends Model
{
    use HasFactory;

    protected $table = 'cuisine_food';
    protected $primaryKey = 'id';

    protected $fillable = [
        'food_id',
        'cuisine_id'
    ];

    public function food() {
        return $this->belongsTo(Food::class);
    }

    public function cuisine() {
        return $this->belongsTo(Cuisine::class);
    }
}
