<?php

namespace App\Http\Controllers;

use App\Models\CourseModel;
use App\Models\EnrollmentsModel;
use App\Models\ProgressModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function user()
    {
        $countsUserCourse = EnrollmentsModel::where('user_id', '=', Auth::id())->count();

        $myCourse = EnrollmentsModel::where('user_id', '=', Auth::id())
            ->with('course.lessons') // eager load related lessons
            ->get();

        $userProgress = [];

        foreach ($myCourse as $enrollment) {
            $course = $enrollment->course;
            $lessons = $course->lessons;
            $totalLessons = $lessons->count();

            $completedLessons = ProgressModel::where('user_id', '=', Auth::id())
                ->where('course_id', $course->id)
                ->where('completed', true)
                ->whereIn('lesson_id', $lessons->pluck('id'))
                ->count();

            $progressPercent = $totalLessons > 0 ? round(($completedLessons / $totalLessons) * 100) : 0;

            $userProgress[] = [
                'course_id' => $course->id,
                'course_title' => $course->title ?? 'Untitled',
                'total_lessons' => $totalLessons,
                'completed_lessons' => $completedLessons,
                'progress_percent' => $progressPercent,
            ];
        }

        return Inertia::render('User/Dashboard', [
            'course' => $countsUserCourse,
            'myCourse' => $myCourse,
            'progress' => $userProgress,
        ]);
    }
    public function admin()
    {
        return Inertia::render('Admin/Dashboard');
    }
}
