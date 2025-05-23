<?php

// Import necessary controllers
use App\Http\Controllers\{
    BootcampController,
    BootcampRegistrationController,
    CourseController,
    DashboardController,
    ManageUserController,
    OauthController,
    ProfileController,
    QuestionController,
    QuizController,
    StudentQuizAnswerController,
    TransactionController,
    UserController
};

// Import required models
use App\Models\{
    Bootcamp,
    BootcampRegistration,
    CategoryModel,
    CourseModel,
    QuizModel,
    Transaction
};

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\{Auth, DB, Route};
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

// Welcome page route
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

// bootcmap related routes
Route::get('/workshop/connect', function () {
    return Inertia::render('Workshop/Connect');
})->name('workshop.index');

Route::get('/bootcamp-softskill', function () {
    $bootcamp = Bootcamp::latest()->paginate(12);
    return Inertia::render('Bootcamp', [
        'bootcamp' => $bootcamp
    ]);
})->name('bootcamp.softskill');

// Course related routes
Route::prefix('courses')->group(function () {
    // All courses listing
    Route::get('/all', function () {
        $courses = CourseModel::paginate(20);
        $categories = CategoryModel::take(10)->get();
        return Inertia::render('User/AllCourses', [
            'courses' => $courses,
            'categories' => $categories
        ]);
    })->name('user.allCourse.index');

    // Course detail page
    Route::get('/show/{slug}/{id}', function ($slug, $id) {
        $course = CourseModel::with(['instructor', 'modules.lessons'])->findOrFail($id);
        $isEnrolled = Auth::check() ? DB::table('enrollments')
            ->where('user_id', Auth::id())
            ->where('course_id', $course->id)
            ->exists() : false;

        return Inertia::render('User/DetailCourse', [
            'course' => $course,
            'isEnrolled' => $isEnrolled,
        ]);
    })->name('user.allCourse.detail');

});

// About us page route
Route::get('/about-us', function () {
    return Inertia::render('About');
})->name('about.us');

/*
|--------------------------------------------------------------------------
| User Routes
|--------------------------------------------------------------------------
*/

Route::name('user.')->middleware(['web', 'auth', 'middleware.student'])->group(function () {



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
        })->name('checkout');

        Route::get('/processing-order/{order_id}', function ($order_id) {
            return Inertia::render('PaymentSuccess', ['orderId' => $order_id]);
        })->name('process.order');
    });

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

/*
|--------------------------------------------------------------------------
| Authentication & Profile Routes
|--------------------------------------------------------------------------
*/

// Profile management routes
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// OAuth routes
Route::prefix('oauth')->name('oauth.')->group(function () {
    Route::get('/google', [OauthController::class, 'redirectToProvider'])->name('google');
    Route::get('/google/callback', [OauthController::class, 'handleProviderCallback'])->name('google.callback');
    Route::get('/set-password', [OauthController::class, 'showForm'])->name('showForm')->middleware('auth');
    Route::post('/set-password', [OauthController::class, 'store'])->name('store')->middleware('auth');
});

/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
*/



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

// Include authentication routes
require __DIR__ . '/auth.php';
