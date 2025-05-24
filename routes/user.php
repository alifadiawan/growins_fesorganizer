<?php

use App\Http\Controllers\BootcampRegistrationController;
use App\Http\Controllers\DashboardController;
use App\Models\BootcampRegistration;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\UserController;
use App\Http\Controllers\StudentQuizAnswerController;
use App\Models\Bootcamp;
use Illuminate\Support\Facades\Auth;

Route::name('user.')->group(function () {
    // dashboards
    Route::get('/dashboard', [DashboardController::class, 'user'])->middleware(['auth.token', 'verified'])->name('dashboard');


    // users courses
    Route::get('/my-course', [UserController::class, 'myCourse'])->name('myCourse');
    Route::get('/my-course/{course_id}/play/{lesson_id?}', [UserController::class, 'coursePlay'])->name('coursePlay');


    // Quiz Routes
    Route::get('/student/quizzes/{quiz}', [StudentQuizAnswerController::class, 'showQuiz'])->name('student.quiz.show');
    Route::post('/student/quizzes/{quiz}/submit', [StudentQuizAnswerController::class, 'store'])->name('student.quiz.submit');
    Route::get('/quizzes/{quiz}/result', [StudentQuizAnswerController::class, 'showResult'])->name('student.quiz.result');


    // Workshop & Bootcamp Routes
    Route::post('/bootcamp-regis/store', [BootcampRegistrationController::class, 'store'])->name('bootcamp_registrations.store');


    // Workshop and bootcamp routes
    Route::prefix('workshops')->group(function () {
        Route::get('/', function () {
            $workshops = Bootcamp::latest()->paginate(12);
            return Inertia::render('User/Workshop/Index', ['workshops' => $workshops]);
        })->name('workshops');

        Route::get('/{id}', function ($id) {
            $bootcamp = Bootcamp::findOrFail($id);
            $bootcampRegistration = BootcampRegistration::where('user_id', Auth::user()->id)
                ->where('bootcamp_id', $id)
                ->first();

            return Inertia::render('User/Workshop/Show', [
                'bootcamp' => $bootcamp,
                'bootcampRegistration' => $bootcampRegistration
            ]);
        })->name('workshop.show');
    });
});

Route::get('/admin/bootcamp-regis/create', [BootcampRegistrationController::class, 'create'])->name('admin.bootcamp_registrations.create');


