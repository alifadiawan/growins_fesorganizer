<?php

namespace App\Http\Controllers;

use App\Models\Choice;
use App\Models\Question;
use App\Models\QuizModel;
use App\Models\StudentQuizAnswer;
use App\Models\StudentQuizAnswerDetail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class StudentQuizAnswerController extends Controller
{
    public function showQuiz(QuizModel $quiz)
    {
        $quiz->load('questions.choices');

        $hasAnswered = StudentQuizAnswer::where('user_id', '=',Auth::id())
            ->where('quiz_id', $quiz->id)
            ->exists();

        return inertia('User/Quiz/TakeQuiz', [
            'quiz' => $quiz,
            'hasAnswered' => $hasAnswered,
        ]);
    }

    // Store student's answers to a quiz
    public function store(Request $request, QuizModel $quiz)
    {
        $request->validate([
            'answers' => 'required|array',
            'answers.*' => 'array|min:1', // supports multiple choices
        ]);

        $user = Auth::user();

        // Prevent duplicate submissions (optional)
        $existing = StudentQuizAnswer::where('quiz_id', $quiz->id)
            ->where('user_id', $user->id)
            ->first();

        if ($existing) {
            return redirect()->back()->with('error', 'You have already submitted this quiz.');
        }

        DB::beginTransaction();

        try {
            $attempt = StudentQuizAnswer::create([
                'user_id' => $user->id,
                'quiz_id' => $quiz->id,
            ]);

            foreach ($request->answers as $questionId => $choiceIds) {
                $question = Question::findOrFail($questionId);

                // Make sure choiceIds is always an array (even for single choice)
                $choiceIds = is_array($choiceIds) ? $choiceIds : [$choiceIds];

                foreach ($choiceIds as $choiceId) {
                    // Optional: validate choice belongs to this question
                    $choice = Choice::where('id', $choiceId)
                        ->where('question_id', $question->id)
                        ->firstOrFail();

                    StudentQuizAnswerDetail::create([
                        'student_quiz_answer_id' => $attempt->id,
                        'question_id' => $question->id,
                        'choice_id' => $choice->id,
                    ]);
                }
            }

            DB::commit();

            return redirect()->back()->with('success', 'Quiz submitted successfully.');
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->back()->with('error', 'Failed.');
        }
    }

    // Optional: Show results (no correct answers shown)
    public function showResult(QuizModel $quiz)
    {
        $studentId = Auth::id();

        $questions = $quiz->questions()->with('choices')->get();

        // Get student's selected answers (map by question_id)
        $studentAnswerMap = StudentQuizAnswerDetail::whereHas('answer', function ($q) use ($studentId, $quiz) {
            $q->where('user_id', $studentId)->where('quiz_id', $quiz->id);
        })->get()->groupBy('question_id');

        return inertia('User/Quiz/Result', [
            'quiz' => $quiz,
            'questions' => $questions,
            'studentAnswers' => $studentAnswerMap,
        ]);
    }


}
