<?php

namespace App\Http\Controllers;

use App\Models\Choice;
use App\Models\Question;
use App\Models\StudentQuizAnswer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class StudentQuizAnswerController extends Controller
{
    // Store student's answers to a quiz
    public function store(Request $request, Question $quiz)
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
            return response()->json(['message' => 'You have already submitted this quiz.'], 400);
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

                    StudentQuizAnswer::create([
                        'student_quiz_answer_id' => $attempt->id,
                        'question_id' => $question->id,
                        'choice_id' => $choice->id,
                    ]);
                }
            }

            DB::commit();

            return response()->json(['message' => 'Quiz submitted successfully.']);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Submission failed.'], 500);
        }
    }

    // Optional: Show results (no correct answers shown)
    public function show(StudentQuizAnswer $answer)
    {
        $this->authorize('view', $answer);

        $answer->load('questionAnswers.choice', 'questionAnswers.question');

        return inertia('Student/Quiz/AnswerDetail', [
            'attempt' => $answer
        ]);
    }
}
