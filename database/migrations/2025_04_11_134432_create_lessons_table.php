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
        Schema::create('lessons', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('module_id')->constrained()->onDelete('cascade');
            $table->string('title');
            $table->text('content')->nullable(); // or a file/video link
            $table->text('video_url')->nullable();
            $table->integer('position');
            $table->string('slug')->unique();
            $table->boolean('is_free')->default(0); // 0 = not free 
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('course_lessons');
    }
};
