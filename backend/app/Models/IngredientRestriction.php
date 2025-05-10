<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class IngredientRestriction extends Model
{
    use HasFactory;
    protected $table = 'ingredient_restrictions';
    protected $primaryKey = 'id';

    protected $fillable = [
        'ingredient_id',
        'restriction_id'
    ];  

    public function ingredient() {
        return $this->belongsTo(Ingredient::class, 'ingredient_id');
    }

    public function restriction() {
        return $this->belongsTo(Restriction::class, 'restriction_id');
    }
}
