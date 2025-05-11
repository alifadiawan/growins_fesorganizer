<?php

use App\Http\Controllers\BootcampController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ManageUserController;
use App\Http\Controllers\OauthController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\QuestionController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\UserController;
use App\Models\CategoryModel;
use App\Models\CourseModel;
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


// admin route
Route::middleware(['auth.token', 'verified'])->prefix('admin')->group(function () {

    Route::get('/course', [CourseController::class, 'index'])->name('admin.course.index');
    Route::get('/course/create', [CourseController::class, 'create'])->name('admin.course.create');
    Route::get('/course/detail/{id}/{slug}', [CourseController::class, 'show'])->name('admin.course.show');
    Route::get('/course/edit/{id}/', [CourseController::class, 'edit'])->name('admin.course.edit');

    Route::get('/user/all', [ManageUserController::class, 'index'])->name('admin.user.index');
    Route::get('/user/detail/{id}', [ManageUserController::class, 'index'])->name('admin.user.detail');
    Route::put('/user/update/{id}', [ManageUserController::class, 'update'])->name('admin.user.update');

});




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
Route::get('/admin/dashboard', function () {
    return Inertia::render('Admin/Dashboard');
})->middleware(['auth.token', 'verified'])->name('admin.dashboard');

Route::get('/dosen/dashboard', function () {
    return Inertia::render('Dosen/Dashboard');
})->name('dosen.dashboard');


// transactions routes
Route::get('admin/transactions/all', function () {
    $allTransactions = Transaction::paginate(20);

    return Inertia('Admin/Transactions/Index', ['transactions' => $allTransactions]);
})->name('admin.transactions.index');

Route::get('admin/transactions/detail/{order_id}', function ($order_id) {
    $transaction = Transaction::with(['course', 'user'])->where('order_id', '=', $order_id)->get();

    if (!$transaction) {
        return redirect()->back()->with('error', 'Not found');
    }

    return Inertia('Admin/Transactions/Detail', ['transaction' => $transaction[0]]);
})->name('admin.transactions.detail');


// admin bootcamps routes
Route::get('/admin/bootcamp-softskill/all', [BootcampController::class, 'index'])->name('bootcamp.index');
Route::get('/admin/bootcamp-softskill/create', [BootcampController::class, 'create'])->name('bootcamp.create');
Route::get('/admin/bootcamp-softskill/store', [BootcampController::class, 'store'])->name('bootcamp.store');


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

// Question
Route::get('/quizzes/{quiz}/questions', [QuestionController::class, 'index']);
Route::post('/quizzes/{quiz}/questions', [QuestionController::class, 'store']);
Route::put('/questions/{question}', [QuestionController::class, 'update']);
Route::delete('/questions/{question}', [QuestionController::class, 'destroy']);

// dosen routes
Route::get('/dosen/all-courses/{user_id}', function ($user_id) {
    $courses = CourseModel::where('user_id', '=', value: $user_id)->paginate(10);

    return Inertia::render('Dosen/Course/AllCourseIndex', ['myCourse' => $courses]);
})->name('dosen.MyCourse');

Route::get('/dosen/course-detail/{user_id}/{course_id}', function ($user_id, $course_id) {
    $courses = CourseModel::with('instructor', 'modules.lessons')
        ->where('user_id', '=',$user_id)
        ->where('id', '=',$course_id)
        ->first();

    return Inertia::render('Dosen/Course/EditCourse', ['course' => $courses]);
})->name('dosen.detailCourse');

require __DIR__ . '/auth.php';
