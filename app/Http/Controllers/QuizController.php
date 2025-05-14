<?php

namespace App\Http\Controllers;

use App\Models\CourseModel;
use App\Models\LessonsModel;
use App\Models\QuizModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Inertia\Inertia;

class QuizController extends Controller
{
    // List all quizzes for a lesson (Instructor view)
    public function index(LessonsModel $lesson)
    {
        if (Auth::user()->role !== 'instructor') {
            abort(403, 'Unauthorized');
        }

        $quizzes = $lesson->quizzes()->latest()->get();

        return Inertia::render('Dosen/Quiz/QuizIndex', [
            'lesson' => $lesson,
            'quizzes' => $quizzes,
        ]);
    }

    public function create(LessonsModel $lesson)
    {
        return Inertia::render('Lecturer/Quiz/Form', [
            'lesson' => $lesson,
        ]);
    }

    public function store(Request $request, LessonsModel $lesson)
    {
        $request->validate([
            'title' => 'required|string|max:255',
        ]);

        QuizModel::create([
            'lesson_id' => $lesson->id,
            'course_id' => $request->course_id,
            'title' => $request->title
        ]);

        return redirect()->back()->with('success', 'Quiz created.');
    }

    public function edit(QuizModel $quiz)
    {
        return Inertia::render('Lecturer/Quiz/Form', [
            'quiz' => $quiz,
            'lesson' => $quiz->lesson,
        ]);
    }

    public function update(Request $request, QuizModel $quiz)
    {
        $request->validate([
            'title' => 'required|string|max:255',
        ]);

        $quiz->update([
            'title' => $request->title,
        ]);

        return redirect()->route('quizzes.index', $quiz->lesson_id)
            ->with('success', 'Quiz updated.');
    }

    public function destroy(QuizModel $quiz)
    {
        $lessonId = $quiz->lesson_id;
        $quiz->delete();

        return redirect()->route('quizzes.index', $lessonId)
            ->with('success', 'Quiz deleted.');
    }
}
