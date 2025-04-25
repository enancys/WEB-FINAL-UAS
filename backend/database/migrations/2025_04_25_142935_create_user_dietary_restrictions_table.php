<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('user_dietary_restrictions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_preference_id')->constrained('user_preferences')->onDelete('cascade');
            $table->foreignId('restriction_id')->constrained('restrictions')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_dietary_restrictions');
    }
};
