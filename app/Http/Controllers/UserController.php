<?php

namespace App\Http\Controllers;

use App\Models\CourseModel;
use App\Models\EnrollmentsModel;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function myCourse($id)
    {
        $myCourse = EnrollmentsModel::with(['course'])->where('user_id', '=', $id)->get();
        return Inertia::render('User/Course/MyCourse', ['myCourse' => $myCourse]);
    }

    public function coursePlay($course_id, $lesson_id = null)
    {
        $course = CourseModel::with('modules.lessons')->findOrFail($course_id);

        $selectedLesson = null;

        if ($lesson_id) {
            // If lesson id is given
            foreach ($course->modules as $module) {
                foreach ($module->lessons as $lesson) {
                    if ($lesson->id == $lesson_id) {
                        $selectedLesson = $lesson;
                        break 2; // stop both loops
                    }
                }
            }
        } else {
            // play the first available lesson
            foreach ($course->modules as $module) {
                if ($module->lessons->isNotEmpty()) {
                    $selectedLesson = $module->lessons->first();
                    break;
                }
            }
        }

        return Inertia::render('User/Course/PlayCourse', [
            'course' => $course,
            'lesson' => $selectedLesson,
            'lesson_id' => $lesson_id
        ]);

    }

    public function nextCourse()
    {
    }
    public function prevCourse()
    {
    }
}
