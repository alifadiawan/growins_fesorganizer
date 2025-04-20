<?php

use App\Http\Controllers\CourseController;
use App\Http\Controllers\ProfileController;
use App\Models\CategoryModel;
use App\Models\CourseModel;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    $course = CourseModel::paginate(10);
    $categories = CategoryModel::take(10)->get();
    return Inertia::render('Welcome', [
        'courseList' => $course,
        'categories' => $categories,
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});


// admin route
Route::middleware(['auth.token', 'verified'])->prefix('admin')->group(function () {

    Route::get('/course', [CourseController::class, 'index'])->name('admin.course.index');
    Route::get('/course/create', [CourseController::class, 'create'])->name('admin.course.create');
    Route::get('/course/detail/{id}/{slug}', [CourseController::class, 'show'])->name('admin.course.show');
    Route::get('/course/edit/{id}/', [CourseController::class, 'edit'])->name('admin.course.edit');

});




// users route
Route::name('user.')->group(function () {

    // all courses
    Route::get('/courses/all', function () {
        $courses = CourseModel::paginate(20);
        $categories = CategoryModel::take(10)->get();
        
        return Inertia::render('User/AllCourses', ['courses'=> $courses, 'categories' => $categories]);
    })->name('allCourse.index');

    // detail courses
    Route::get('/course/{slug}/{id}', function($slug, $id){
        $course = CourseModel::with(['instructor', 'modules.lessons'])->find($id);
        return Inertia::render('User/DetailCourse', ['course' => $course]);
    })->name('allCourse.detail');

});






Route::get('/user/dashboard', function () {
    return Inertia::render('User/Dashboard');
})->middleware(['auth.token', 'verified'])->name('user.dashboard');

Route::get('/admin/dashboard', function () {
    return Inertia::render('Admin/Dashboard');
})->middleware(['auth.token', 'verified'])->name('admin.dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
