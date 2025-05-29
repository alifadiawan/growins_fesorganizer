<?php

// Import necessary controllers
use App\Http\Controllers\{
    OauthController,
    ProfileController,
};
use App\Models\{
    CategoryModel,
    CourseModel,
    QuizModel,
};

use App\Http\Controllers\Public\LandingPageController;
use App\Http\Controllers\User\BootcampController;
use Illuminate\Support\Facades\{Auth, DB, Route};
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

// Lading page route
Route::get('/', [LandingPageController::class, 'index'])->name('welcome');
Route::get('/bootcamp-softskill', [LandingPageController::class, 'bootcamp_softskill'])->name('bootcamp.softskill');
Route::get('/about-us', [LandingPageController::class, 'about'])->name('about.us');

Route::get('/show/test', function(){
    return Inertia::render('Workshop/Show');
});

// Courses Routes
Route::get('/courses/all', [LandingPageController::class, 'all_course'])->name('user.allCourse.index');
Route::get('/courses/show/{slug}/{id}', [LandingPageController::class, 'detail_course'])->name('user.allCourse.detail');

Route::get('/workshops/{slug}', [BootcampController::class, 'show'])->name('bootcamp.show.public');

/*
|--------------------------------------------------------------------------
| Authentication & Profile Routes
|--------------------------------------------------------------------------
*/
require __DIR__ . '/auth.php';

// OAuth routes
Route::prefix('oauth')->middleware(['web'])->name('oauth.')->group(function () {
    Route::get('/google', [OauthController::class, 'redirectToProvider'])->name('google');
    Route::get('/google/callback', [OauthController::class, 'handleProviderCallback'])->name('google.callback');
});

Route::prefix('oauth')->middleware(['auth'])->name('oauth.')->group(function () {
    Route::get('/set-password', [OauthController::class, 'showForm'])->name('showForm')->middleware(['auth', 'signed']);
    Route::post('/set-password', [OauthController::class, 'store'])->name('store');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

/*
|--------------------------------------------------------------------------
| Public Transactional Routes
|--------------------------------------------------------------------------
*/

// Payment and checkout routes
Route::prefix('payment')->group(function () {
    Route::get('/thank-you', function () {
        return Inertia::render('Thanks');
    });

    Route::get('/checkout/{course_id}/{user_id}', function ($course_id, $user_id) {
        $course = CourseModel::find($course_id);
        return Inertia::render('Checkout', [
            'course' => $course,
            'userId' => $user_id,
            'midtransClientKey' => env('MIDTRANS_CLIENTKEY')
        ]);
    })->name('user.checkout');

    Route::get('/processing-order/{order_id}', function ($order_id) {
        return Inertia::render('PaymentSuccess', ['orderId' => $order_id]);
    })->name('user.process.order');
});

/*
|--------------------------------------------------------------------------
| Instructor Routes
|--------------------------------------------------------------------------
*/

Route::prefix('dosen')->name('dosen.')->group(function () {
    Route::get('/all-courses/{user_id}', function ($user_id) {
        $courses = CourseModel::where('user_id', $user_id)->paginate(10);
        return Inertia::render('Dosen/Course/AllCourseIndex', ['myCourse' => $courses]);
    })->name('MyCourse');

    Route::get('/course-detail/{user_id}/{course_id}', function ($user_id, $course_id) {
        $courses = CourseModel::with('instructor', 'modules.lessons')
            ->where('user_id', $user_id)
            ->where('id', $course_id)
            ->first();
        $quiz = QuizModel::where('course_id', $course_id)->get();

        return Inertia::render('Dosen/Course/EditCourse', [
            'course' => $courses,
            'quiz' => $quiz
        ]);
    })->name('detailCourse');
});


/*
|--------------------------------------------------------------------------
| Custom Landing Page Routes
|--------------------------------------------------------------------------
*/

Route::get('/workshop/impact', function () {
    return Inertia::render('Workshop/Impact');
})->name('workshop.impact');
