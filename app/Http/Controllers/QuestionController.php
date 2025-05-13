<?php

namespace App\Http\Controllers;

use App\Models\Question;
use App\Models\QuizModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class QuestionController extends Controller
{
    public function index(QuizModel $quiz)
    {
        if (Auth::user()->role != 'instructor') {
            return redirect()->back()->with('error', 'You are not authorized');
        }

        $questions = $quiz->questions()->with('choices')->get();

        return inertia('Dosen/Quiz/QuestionIndex', [
            'quiz' => $quiz,
            'questions' => $questions,
        ]);
    }

    public function create(QuizModel $quiz)
    {
        if (Auth::user()->role !== 'instructor') {
            abort(403, 'Unauthorized');
        }

        return inertia('Dosen/Quiz/QuestionCreate', [
            'quiz' => $quiz,
        ]);
    }

    // Store a new question
    public function store(Request $request, QuizModel $quiz)
    {
        if (Auth::user()->role != 'instructor') {
            return redirect()->back()->with('error', 'You are not authorized');
        }

        $validated = $request->validate([
            'question' => 'required|string',
            'type' => 'required|in:single,multiple',
            'choices' => 'required|array|min:2',
            'choices.*.text' => 'required|string',
            'choices.*.is_correct' => 'required|boolean',
        ]);

        $question = $quiz->questions()->create([
            'id' => Str::uuid(),
            'question' => $validated['question'],
            'type' => $validated['type'],
        ]);

        foreach ($validated['choices'] as $choice) {
            $question->choices()->create([
                'id' => Str::uuid(),
                'text' => $choice['text'],
                'is_correct' => $choice['is_correct'],
            ]);
        }

        return redirect()->back()->with('success', 'Question created.');
    }

    // Update an existing question
    public function update(Request $request, Question $question)
    {
        if (Auth::user()->role != 'instructor') {
            return redirect()->back()->with('error', 'You are not authorized');
        }

        $validated = $request->validate([
            'question' => 'required|string',
            'type' => 'required|in:single,multiple',
            'choices' => 'required|array|min:2',
            'choices.*.id' => 'nullable|uuid',
            'choices.*.text' => 'required|string',
            'choices.*.is_correct' => 'required|boolean',
        ]);

        $question->update([
            'question' => $validated['question'],
            'type' => $validated['type'],
        ]);

        // Sync choices
        $existingChoiceIds = $question->choices()->pluck('id')->toArray();
        $incomingChoiceIds = collect($validated['choices'])->pluck('id')->filter()->toArray();

        // Delete removed choices
        $question->choices()->whereNotIn('id', $incomingChoiceIds)->delete();

        foreach ($validated['choices'] as $choiceData) {
            if (isset($choiceData['id'])) {
                // Update existing
                $question->choices()->where('id', $choiceData['id'])->update([
                    'text' => $choiceData['text'],
                    'is_correct' => $choiceData['is_correct'],
                ]);
            } else {
                // Create new
                $question->choices()->create([
                    'id' => Str::uuid(),
                    'text' => $choiceData['text'],
                    'is_correct' => $choiceData['is_correct'],
                ]);
            }
        }

        return redirect()->back()->with('success', 'Question updated.');
    }

    // Delete a question
    public function destroy(Question $question)
    {
        if (Auth::user()->role != 'instructor') {
            return redirect()->back()->with('error', 'You are not authorized');
        }

        $question->choices()->delete();
        $question->delete();

        return redirect()->back()->with('success', 'Question deleted.');
    }
}
