<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CategoryFood extends Model
{
    use HasFactory;

    protected $table = 'category_food';
    protected $primaryKey = 'id';

    protected $fillable = [
        'category_id',
        'food_id'
    ];

    public function category() {
        return $this->belongsTo(Category::class);
    }

    public function food() {
        return $this->belongsTo(Food::class);
    }
}
