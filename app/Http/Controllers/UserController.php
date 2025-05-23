<?php

namespace App\Http\Controllers;

use App\Models\CourseModel;
use App\Models\EnrollmentsModel;
use App\Models\ProgressModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class UserController extends Controller
{
    public function myCourse()
    {
        $myCourse = EnrollmentsModel::with(['course'])
            ->where('user_id', '=', Auth::id())
            ->get();

        return Inertia::render('User/Course/MyCourse', ['myCourse' => $myCourse]);
    }

    public function coursePlay($course_id, $lesson_id = null)
    {
        // Load course with modules and lessons
        $course = CourseModel::with('modules.lessons.quiz')->findOrFail($course_id);

        // Get the logged-in user ID
        $userId = Auth::id();

        // Fetch user progress for this course
        $progress = ProgressModel::where('user_id', $userId)
            ->where('course_id', $course_id)
            ->pluck('completed', 'lesson_id'); // [lesson_id => completed]

        // Add `completed` status to each lesson
        foreach ($course->modules as $module) {
            foreach ($module->lessons as $lesson) {
                $lesson->completed = (bool) ($progress[$lesson->id] ?? false);
            }
        }

        // Determine which lesson to play
        $selectedLesson = null;

        if ($lesson_id) {
            // Use requested lesson
            foreach ($course->modules as $module) {
                foreach ($module->lessons as $lesson) {
                    if ($lesson->id == $lesson_id) {
                        $selectedLesson = $lesson;
                        break 2;
                    }
                }
            }
        } else {
            // Default to first lesson
            foreach ($course->modules as $module) {
                if ($module->lessons->isNotEmpty()) {
                    $selectedLesson = $module->lessons->first();
                    break;
                }
            }
        }

        // Return to frontend via Inertia
        return Inertia::render('User/Course/PlayCourse', [
            'course' => $course,
            'lesson' => $selectedLesson,
            'lesson_id' => $lesson_id,
        ]);
    }

    public function nextCourse()
    {
    }
    public function prevCourse()
    {
    }
}
