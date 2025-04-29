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
        Schema::table('foods', function (Blueprint $table) {
            $table->string('image_url')->nullable()->after('price');
            $table->unsignedBigInteger('restaurant_id')->nullable()->after('image_url');
            $table->unsignedBigInteger('cuisine_id')->nullable()->after('restaurant_id');

            $table->foreign('restaurant_id')->references('id')->on('restaurants')->onDelete('set null');
            $table->foreign('cuisine_id')->references('id')->on('cuisines')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('foods', function (Blueprint $table) {
            //
        });
    }
};
