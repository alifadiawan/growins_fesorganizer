<?php

namespace App\Http\Controllers;

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

    public function create(){
        return Inertia::render('Admin/Course/Create');
    }

    public function show($id)
    {
        $course = CourseModel::with('instructor')->find($id);

        return Inertia::render('Admin/Course/Detail', [
            'course' => $course
        ]);
    }

    public function edit($id)
    {
        $course = CourseModel::with('instructor', 'modules.lessons')->find($id);

        return Inertia::render('Admin/Course/Edit', [
            'course' => $course,
            'modules' => $course->modules
        ]);
    }
}
