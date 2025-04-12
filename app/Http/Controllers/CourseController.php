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

    public function show($id)
    {
        $course = CourseModel::with('instructor')->find($id);

        return Inertia::render('Admin/Course/Detail', [
            'course' => $course
        ]);
    }
}
