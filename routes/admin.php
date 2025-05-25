<?php

use App\Http\Controllers\Admin\AdminDashboardController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\CourseController;
use App\Http\Controllers\BootcampController;
use App\Http\Controllers\BootcampRegistrationController;
use App\Http\Controllers\ManageUserController;
use App\Http\Controllers\QuestionController;
use App\Http\Controllers\QuizController;
use App\Models\Transaction;

/*
|--------------------------------------------------------------------------
| Views Routes
|--------------------------------------------------------------------------
*/

Route::get('/dashboard', [AdminDashboardController::class, 'dashboard'])->name('admin.dashboard');

Route::get('/transactions/all', [AdminDashboardController::class, 'transaction_view'])->name('admin.transactions.index');
Route::get('/transactions/detail/{order_id}', [AdminDashboardController::class, 'transaction_detail'])->name('admin.transactions.detail');


/*
|--------------------------------------------------------------------------
| Users Management Routes
|--------------------------------------------------------------------------
*/

Route::get('/user/all', [ManageUserController::class, 'index'])->name('admin.user.index');
Route::get('/user/detail/{id}', [ManageUserController::class, 'index'])->name('admin.user.detail');
Route::put('/user/update/{id}', [ManageUserController::class, 'update'])->name('admin.user.update');

/*
|--------------------------------------------------------------------------
| Bootcamp & Workshop Routes
|--------------------------------------------------------------------------
*/

Route::get('/bootcamp-softskill/all', [BootcampController::class, 'index'])->name('bootcamp.index');
Route::get('/bootcamp-softskill/create', [BootcampController::class, 'create'])->name('bootcamp.create');
Route::post('/bootcamp-softskill/store', [BootcampController::class, 'store'])->name('bootcamp.store');

/*
|--------------------------------------------------------------------------
| Question Routes
|--------------------------------------------------------------------------
*/
Route::get('/quizzes/{quiz}/questions', [QuestionController::class, 'index'])->name('quiz.index');
Route::get('/quizzes/{quiz}/questions/create', [QuestionController::class, 'create'])->name('quiz.create');
Route::post('/quizzes/{quiz}/questions', [QuestionController::class, 'store'])->name('quiz.store');
Route::put('/questions/{question}', [QuestionController::class, 'update']);
Route::delete('/questions/{question}', [QuestionController::class, 'destroy']);

/*
|--------------------------------------------------------------------------
| Quizzes Routes
|--------------------------------------------------------------------------
*/
Route::post('/lessons/{lesson}/quizzes', [QuizController::class, 'store'])->name('quizzes.store');
Route::get('/quizzes/{quiz}/edit', [QuizController::class, 'edit'])->name('quizzes.edit');
Route::put('/quizzes/{quiz}', [QuizController::class, 'update'])->name('quizzes.update');
Route::delete('/quizzes/{quiz}', [QuizController::class, 'destroy'])->name('quizzes.destroy');

/*
|--------------------------------------------------------------------------
| Bootcamp Registration Routes
|--------------------------------------------------------------------------
*/
Route::get('/bootcamp', [BootcampController::class, 'index'])->name('bootcamp.index');
Route::get('/bootcamp/create', [BootcampController::class, 'create'])->name('bootcamp.create');
Route::post('/bootcamp', [BootcampController::class, 'store'])->name('bootcamp.store');
Route::get('/bootcamp/{id}', [BootcampController::class, 'show'])->name('bootcamp.show');
Route::get('/bootcamp/{id}/edit', [BootcampController::class, 'edit'])->name('bootcamp.edit');
Route::put('/bootcamp/{id}', [BootcampController::class, 'update'])->name('bootcamp.update');
Route::delete('/bootcamp/{id}', [BootcampController::class, 'destroy'])->name('bootcamp.destroy');

// bootcamp registration
Route::get('/admin/bootcamp-regis', [BootcampRegistrationController::class, 'index'])->name('admin.bootcamp_registrations.index');

Route::name('admin.')->group(function () {
    Route::resource('course', CourseController::class)->except(['destroy']);
});