<?php

use App\Http\Controllers\DashboardController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\UserController;
use App\Http\Controllers\StudentQuizAnswerController;
use App\Models\CategoryModel;
use App\Models\CourseModel;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

Route::name('user.')->group(function () {


    // dashboards
    Route::get('/user/dashboard/{id}', [DashboardController::class, 'user'])->middleware(['auth.token', 'verified'])->name('dashboard');


    // users courses
    Route::get('/my-course', [UserController::class, 'myCourse'])->name('myCourse');
    Route::get('/my-course/{course_id}/play/{lesson_id?}', [UserController::class, 'coursePlay'])->name('coursePlay');


    // Quiz Routes
    Route::get('/student/quizzes/{quiz}', [StudentQuizAnswerController::class, 'showQuiz'])->name('student.quiz.show');
    Route::post('/student/quizzes/{quiz}/submit', [StudentQuizAnswerController::class, 'store'])->name('student.quiz.submit');
    Route::get('/quizzes/{quiz}/result', [StudentQuizAnswerController::class, 'showResult'])->name('student.quiz.result');

});

