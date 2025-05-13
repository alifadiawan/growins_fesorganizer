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
        Schema::create('student_quiz_answer_details', function (Blueprint $table) {
            $table->id();
            $table->foreignId('student_quiz_answer_id')->constrained('student_quiz_answers')->onDelete('cascade');
            $table->foreignUuid('question_id')->constrained()->onDelete('cascade');
            $table->foreignUuid('choice_id')->constrained()->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('student_quiz_answer_details');
    }
};
