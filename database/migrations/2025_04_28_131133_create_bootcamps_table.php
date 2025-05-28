<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('bootcamps', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->string('slug')->unique();
            $table->string('title');
            $table->mediumText('description');

            $table->string('quota')->nullable();
            $table->string('cover')->nullable();   
            $table->string('poster')->nullable();   
            $table->string('url')->nullable(); // maybe external registration link fallback?
            $table->json('custom_attributes')->nullable();

            $table->string('time_start')->nullable();
            $table->string('time_end')->nullable();
            $table->string('date_start')->nullable();
            $table->string('date_end')->nullable();

            $table->integer('normal_price');
            $table->integer('discounted_price')->nullable();

            // New fields:
            $table->string('meta_title')->nullable();
            $table->string('hero_image')->nullable();
            $table->text('meta_description')->nullable();
            $table->boolean('is_published')->default(false);

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
