<?php

use App\Http\Controllers\API\Course\CourseAPI;
use App\Http\Controllers\API\Course\LessonsAPI;
use App\Http\Controllers\API\Course\ModulesAPI;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\BootcampController;
use App\Http\Controllers\ManageUserController;
use App\Http\Controllers\ProgressController;
use App\Http\Controllers\TransactionController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


// public API
// 100 request per menit
Route::get('/courses', [CourseAPI::class, 'index'])->name('courses.get')
    ->middleware('web', 'auth', 'throttle:100,1');
Route::get('/modules', [ModulesAPI::class, 'index'])
    ->middleware('web', 'auth', 'throttle:100,1');
Route::post('/login', [AuthenticatedSessionController::class, 'login'])->name('login');

Route::get('/bootcamp/fetch', [BootcampController::class, 'fetchBootcamp'])->name('bootcamp.fetch');

Route::middleware('auth.token')->name('api.')->group(function () {

    // Course API
    Route::post('/store/courses', [CourseAPI::class, 'store'])->name('courses.store');
    Route::get('show/{slug}/{id}', [CourseAPI::class, 'show'])->name('courses.show');
    Route::put('/update/courses/{id}', [CourseAPI::class, 'update'])->name('courses.update');
    Route::delete('/delete/courses/{course_id}', [CourseAPI::class, 'delete'])->name('courses.delete');

    Route::post('/course/update-progress/{user_id}/{lesson_id}/{course_id}', [ProgressController::class, 'setProgress'])->name('update.progress');

    // Modules API
    Route::get('/{title}/{id}/show', [ModulesAPI::class, 'show'])->name('modules.show');
    Route::post('/modules/store', [ModulesAPI::class, 'store'])->name('modules.store');
    Route::put('/modules//update{id}', [ModulesAPI::class, 'update'])->name('modules.update');
    Route::delete('/modules/{id}/delete', [ModulesAPI::class, 'destroy'])->name('modules.delete');

    // lessons
    Route::post('/lessons/store/{module_id}', [LessonsAPI::class, 'store'])->name('lessons.store');
    Route::put('/lessons/update/{id}', [LessonsAPI::class, 'update'])->name('lessons.update');
    Route::delete('/lessons/{id}/delete', [LessonsAPI::class, 'destroy'])->name('lessons.delete');

    // transactions
    Route::post('/transaction/buy-course/{course_id}/{user_id}', [TransactionController::class, 'createTransaction'])->name('transaction.createTransaction');
    Route::post('/processing-transactions/{orderId}', [TransactionController::class, 'setTransactionAccept'])->name('processing.transactions');

    Route::post('/update-dosen/{userId}', [ManageUserController::class, 'updateToDosen'])->name('update.dosen');
});

