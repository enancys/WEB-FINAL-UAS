<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserDietaryResctriction extends Model
{
    use HasFactory;
    protected $table = 'user_dietary_restrictions';
    protected $primaryKey  = 'id';
    protected $fillable = [
        'user_preference_id',
        'restriction_id'
    ];

    public function userPreference() {
        return $this->belongsTo(UserPreference::class, 'user_preference_id');
    }

    public function restriction() {
        return $this->belongsTo(Restriction::class, 'restriction_id');
    }
}
