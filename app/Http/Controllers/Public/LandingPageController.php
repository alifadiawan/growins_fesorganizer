<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Bootcamp;
use App\Models\CategoryModel;
use App\Models\CourseModel;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class LandingPageController extends Controller
{
    public function index()
    {
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
    }

    public function all_course()
    {
        $courses = CourseModel::paginate(20);
        $categories = CategoryModel::take(10)->get();
        return Inertia::render('User/AllCourses', [
            'courses' => $courses,
            'categories' => $categories
        ]);
    }

    public function bootcamp_softskill()
    {
        $bootcamp = Bootcamp::latest()->paginate(12);
        return Inertia::render('Bootcamp', [
            'bootcamp' => $bootcamp
        ]);
    }

    public function detail_course($slug, $id)
    {
        $course = CourseModel::with(['instructor', 'modules.lessons'])->findOrFail($id);
        $isEnrolled = Auth::check() ? DB::table('enrollments')
            ->where('user_id', Auth::id())
            ->where('course_id', $course->id)
            ->exists() : false;

        return Inertia::render('User/DetailCourse', [
            'course' => $course,
            'isEnrolled' => $isEnrolled,
        ]);
    }

    public function about()
    {
        return Inertia::render('About');
    }
}
