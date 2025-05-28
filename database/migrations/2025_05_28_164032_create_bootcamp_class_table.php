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
        Schema::create('bootcamp_class', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->foreignUuid('bootcamp_id')->constrained()->onDelete('cascade');
            $table->string('name');           // e.g. "Standard Access"
            $table->string('slug')->unique(); // e.g. "standard-access" used in URL
            $table->decimal('price')->nullable(); // null or 0 for free
            $table->text('description')->nullable();
            $table->json('custom_fields')->nullable(); 
            $table->integer('order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->string('accent_color')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bootcamp_class');
    }
};
