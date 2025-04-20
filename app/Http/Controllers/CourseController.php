<?php

namespace App\Http\Controllers;

use App\Models\CategoryModel;
use App\Models\CourseModel;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Http;

class CourseController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Course/Index');
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
