<?php

namespace App\Http\Controllers;

use App\Models\CourseModel;
use App\Models\EnrollmentsModel;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function user($id){

        $countsUserCourse = EnrollmentsModel::where('user_id', '=', $id)->count();

        return Inertia::render('User/Dashboard', ['course' => $countsUserCourse]);
    }
    public function admin(){
        return Inertia::render('Admin/Dashboard');
    }
}
