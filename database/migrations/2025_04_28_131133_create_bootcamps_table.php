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
        Schema::create('bootcamps', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->string('title');
            $table->mediumText('description');
            $table->string('time_start')->nullable();
            $table->string('time_end')->nullable();
            $table->string('date_start')->nullable();
            $table->string('date_end')->nullable();
            $table->string('main_theme')->nullable();
            $table->string('quota')->nullable();
            $table->string('cover')->nullable();
            $table->string('url')->nullable();
            $table->integer('normal_price');
            $table->integer('discounted_price')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bootcamps');
    }
};
