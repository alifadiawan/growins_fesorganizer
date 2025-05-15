<?php
use App\Http\Controllers\BootcampController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\CourseController;
use App\Http\Controllers\ManageUserController;
use App\Http\Controllers\QuestionController;
use App\Http\Controllers\QuizController;
use App\Models\Transaction;

// **** Views Routes **** // 
Route::get('/dashboard', function () {
    return Inertia::render('Admin/Dashboard');
})->name('admin.dashboard');

// Transaction View
Route::get('/transactions/all', function () {
    $allTransactions = Transaction::paginate(20);

    return Inertia('Admin/Transactions/Index', ['transactions' => $allTransactions]);
})->name('admin.transactions.index');

Route::get('/transactions/detail/{order_id}', function ($order_id) {
    $transaction = Transaction::with(['course', 'user'])->where('order_id', '=', $order_id)->get();

    if (!$transaction) {
        return redirect()->back()->with('error', 'Not found');
    }

    return Inertia('Admin/Transactions/Detail', ['transaction' => $transaction[0]]);
})->name('admin.transactions.detail');





// **** Controllers **** // 

// Course CRUD
Route::get('/course', [CourseController::class, 'index'])->name('admin.course.index');
Route::get('/course/create', [CourseController::class, 'create'])->name('admin.course.create');
Route::get('/course/detail/{id}/{slug}', [CourseController::class, 'show'])->name('admin.course.show');
Route::get('/course/edit/{id}/', [CourseController::class, 'edit'])->name('admin.course.edit');

// Manage User
Route::get('/user/all', [ManageUserController::class, 'index'])->name('admin.user.index');
Route::get('/user/detail/{id}', [ManageUserController::class, 'index'])->name('admin.user.detail');
Route::put('/user/update/{id}', [ManageUserController::class, 'update'])->name('admin.user.update');

// Bootcamp CRUD
Route::get('/bootcamp-softskill/all', [BootcampController::class, 'index'])->name('bootcamp.index');
Route::get('/bootcamp-softskill/create', [BootcampController::class, 'create'])->name('bootcamp.create');
Route::get('/bootcamp-softskill/store', [BootcampController::class, 'store'])->name('bootcamp.store');

// Question
Route::get('/quizzes/{quiz}/questions', [QuestionController::class, 'index'])->name('quiz.index');
Route::get('/quizzes/{quiz}/questions/create', [QuestionController::class, 'create'])->name('quiz.create');
Route::post('/quizzes/{quiz}/questions', [QuestionController::class, 'store'])->name('quiz.store');
Route::put('/questions/{question}', [QuestionController::class, 'update']);
Route::delete('/questions/{question}', [QuestionController::class, 'destroy']);

// Quiz
Route::post('/lessons/{lesson}/quizzes', [QuizController::class, 'store'])->name('quizzes.store');
Route::get('/quizzes/{quiz}/edit', [QuizController::class, 'edit'])->name('quizzes.edit');
Route::put('/quizzes/{quiz}', [QuizController::class, 'update'])->name('quizzes.update');
Route::delete('/quizzes/{quiz}', [QuizController::class, 'destroy'])->name('quizzes.destroy');