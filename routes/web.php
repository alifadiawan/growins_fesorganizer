<?php

use App\Http\Controllers\CourseController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});


// admin route
Route::middleware('auth.token')->prefix('admin')->group(function(){

    Route::get('/course', [CourseController::class, 'index'])->name('admin.course.index');
    Route::get('/course/detail/{id}/{slug}', [CourseController::class, 'show'])->name('admin.course.show');

});

// users route


Route::get('/dashboard', function () {
    return Inertia::render('User/Dashboard');
})->middleware(['auth.token', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
