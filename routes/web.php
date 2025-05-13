<?php

use App\Http\Controllers\BootcampController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ManageUserController;
use App\Http\Controllers\OauthController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\QuestionController;
use App\Http\Controllers\QuizController;
use App\Http\Controllers\StudentQuizAnswerController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\UserController;
use App\Models\CategoryModel;
use App\Models\CourseModel;
use App\Models\QuizModel;
use App\Models\Transaction;
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

Route::get('/about-us', function () {
    return Inertia::render('About');
})->name('about.us');


// users route
Route::name('user.')->group(function () {

    // all courses
    Route::get('/courses/all', function () {
        $courses = CourseModel::paginate(20);
        $categories = CategoryModel::take(10)->get();

        return Inertia::render('User/AllCourses', ['courses' => $courses, 'categories' => $categories]);
    })->name('allCourse.index');

    // detail courses
    Route::get('/course/show/{slug}/{id}', function ($slug, $id) {
        $course = CourseModel::with(['instructor', 'modules.lessons'])->find($id);
        return Inertia::render('User/DetailCourse', ['course' => $course]);
    })->name('allCourse.detail');


    // users courses
    Route::get('/my-course/{id}', [UserController::class, 'myCourse'])->name('myCourse');
    Route::get('/my-course/{course_id}/play/{lesson_id?}', [UserController::class, 'coursePlay'])->name('coursePlay');


    // Quiz Routes
    Route::get('/student/quizzes/{quiz}', [StudentQuizAnswerController::class, 'showQuiz'])
        ->name('student.quiz.show');

    Route::post('/student/quizzes/{quiz}/submit', [StudentQuizAnswerController::class, 'store'])
        ->name('student.quiz.submit');

    Route::get('/quizzes/{quiz}/result', [StudentQuizAnswerController::class, 'showResult'])
        ->name('student.quiz.result');

    // transaction - 2
    Route::get('/thank-you', function () {
        return Inertia::render('Thanks');
    });

    Route::get('/checkout/{course_id}/{user_id}', function ($course_id, $user_id) {
        $course = CourseModel::find($course_id);
        return Inertia::render('Checkout', ['course' => $course, 'userId' => $user_id, 'midtransClientKey ' => env('MIDTRANS_CLIENTKEY')]);
    })->name('checkout');

    Route::get('/processing-order/{order_id}', function ($order_id) {
        return Inertia::render('PaymentSuccess', ['orderId' => $order_id]);
    })->name('process.order');


    Route::get('/bootcamp-softskill', function () {
        return Inertia::render('Bootcamp');
    });

});





// dashboards
Route::get('/user/dashboard/{id}', [DashboardController::class, 'user'])->middleware(['auth.token', 'verified'])->name('user.dashboard');


Route::get('/dosen/dashboard', function () {
    return Inertia::render('Dosen/Dashboard');
})->name('dosen.dashboard');


// transactions routes



// admin bootcamps routes


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


// OAuth
Route::get('oauth/google', [OauthController::class, 'redirectToProvider'])->name('oauth.google');
Route::get('oauth/google/callback', [OauthController::class, 'handleProviderCallback'])->name('oauth.google.callback');
Route::get('/set-password', [OauthController::class, 'showForm'])->name('oauth.showForm')->middleware('auth');
Route::post('/set-password', [OauthController::class, 'store'])->name('oauth.store')->middleware('auth');



// dosen routes
Route::get('/dosen/all-courses/{user_id}', function ($user_id) {
    $courses = CourseModel::where('user_id', '=', value: $user_id)->paginate(10);

    return Inertia::render('Dosen/Course/AllCourseIndex', ['myCourse' => $courses]);
})->name('dosen.MyCourse');

Route::get('/dosen/course-detail/{user_id}/{course_id}', function ($user_id, $course_id) {
    $courses = CourseModel::with('instructor', 'modules.lessons')
        ->where('user_id', '=', $user_id)
        ->where('id', '=', $course_id)
        ->first();

    $quiz = QuizModel::where('course_id', '=', $course_id)->get();

    return Inertia::render('Dosen/Course/EditCourse', ['course' => $courses, 'quiz' => $quiz]);
})->name('dosen.detailCourse');

require __DIR__ . '/auth.php';
