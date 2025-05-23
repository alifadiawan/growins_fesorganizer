<?php

namespace App\Http\Controllers;

use App\Models\CategoryModel;
use App\Models\CourseModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Facades\Http;

class CourseController extends Controller
{
    public function index()
    {
        $myCourse = CourseModel::where('user_id', '=', Auth::id())->count();
        $publishedCourse = CourseModel::where('status', '=', 'published')
            ->where('user_id', '=', Auth::id())
            ->count();
        $pendingCourse = CourseModel::where('status', '=', 'pending')
            ->where('user_id', '=', Auth::id())
            ->count();

        return Inertia::render('Admin/Course/Index', [
            'myCourse' => $myCourse,
            'publishedCourse' => $publishedCourse,
            'pendingCourse' => $pendingCourse,
        ]);
    }

    public function create()
    {
        $categories = CategoryModel::all();
        return Inertia::render('Admin/Course/Create', ['categories' => $categories]);
    }

    public function show($id)
    {
        $course = CourseModel::with([
            'instructor',
            'modules.lessons'
        ])->find($id);

        return Inertia::render('Admin/Course/Detail', [
            'course' => $course
        ]);
    }

    public function edit($id)
    {
        $course = CourseModel::with([
            'instructor',
            'modules.lessons'
        ])->find($id);

        return Inertia::render('Admin/Course/Edit', [
            'course' => $course,
            'modules' => $course->modules
        ]);
    }
}
