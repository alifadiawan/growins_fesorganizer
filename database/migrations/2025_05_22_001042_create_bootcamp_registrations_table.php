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
        Schema::create('bootcamp_registrations', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->string('bootcamp_id')->nullable(); // Foreign key to bootcamps

            $table->string('whatsapp_number')->nullable();
            $table->string('city')->nullable();
            $table->string('province')->nullable();

            $table->string('nama')->nullable();              
            $table->string('email')->nullable();              
            $table->string('jurusan')->nullable();           
            $table->string('asal_kampus')->nullable();       
            $table->string('nomor_telp')->nullable();       
            $table->string('username_ig')->nullable();      
            $table->string(column: 'cv_path')->nullable();
            $table->string('cover')->nullable();

            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bootcamp_registrations');
    }
};
