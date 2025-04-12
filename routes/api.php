<?php

use App\Http\Controllers\API\Course\CourseAPI;
use App\Http\Controllers\API\Course\ModulesAPI;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


// public API
Route::get('/courses', [CourseAPI::class, 'index'])->name('courses.get')
    ->middleware('throttle:100,1'); // 100 request per menit
Route::get('/modules', [ModulesAPI::class, 'index'])
    ->middleware('throttle:100,1');
Route::post('/login', [AuthenticatedSessionController::class, 'login'])->name('login');

Route::middleware('auth:sanctum')->name('api.')->group(function () {

    // Course API
    Route::post('/store/courses', [CourseAPI::class, 'store'])->name('courses.store');
    Route::get('show/{slug}/{id}', [CourseAPI::class, 'show'])->name('courses.show');
    Route::put('/update/courses/{id}', [CourseAPI::class, 'update'])->name('courses.update');
    Route::get('/delete/courses', [CourseAPI::class, 'delete'])->name('courses.delete');

    // Modules API
    Route::get('/{title}/{id}/show', [ModulesAPI::class, 'show']);
    Route::post('/modules/store', [ModulesAPI::class, 'store']);
    Route::put('/modules//update{id}', [ModulesAPI::class, 'update']);
    Route::delete('/modules/{id}/delete', [ModulesAPI::class, 'destroy']);





});

