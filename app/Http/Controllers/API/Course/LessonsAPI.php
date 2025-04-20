<?php

namespace App\Http\Controllers\API\Course;

use App\Http\Controllers\Controller;
use App\Models\LessonsModel;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class LessonsAPI extends Controller
{
    // Show all lessons
    public function index()
    {
        return response()->json(LessonsModel::all());
    }

    // Show lesson by ID
    public function show($id)
    {
        $lesson = LessonsModel::findOrFail($id);
        return response()->json($lesson);
    }

    // Store new lesson
    public function store(Request $request, $module_id)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'nullable|string',
            'video_url' => 'nullable|string',
            'is_free' => 'nullable|boolean',
        ]);


        $lastPosition = LessonsModel::where('module_id', $module_id)->max('position') ?? 0;
        $lesson = LessonsModel::create([
            'id' => Str::uuid(),
            'module_id' => $module_id,
            'title' => $validated['title'],
            'content' => $validated['content'] ?? null,
            'video_url' => $validated['video_url'] ?? null,
            'is_free' => $validated['is_free'] ?? null,
            'position' => $lastPosition + 1,
            'slug' => Str::slug($validated['title']) . '-' . uniqid(),
        ]);

        return response()->json(['message' => 'success'], 201);
    }

    // Update lesson
    public function update(Request $request, $id)
    {
        $lesson = LessonsModel::findOrFail($id);

        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'content' => 'nullable|string',
            'video_url' => 'nullable|string',
            'position' => 'nullable|boolean',
        ]);

        $lesson->update($validated);

        return response()->json($lesson);
    }

    // Delete lesson
    public function destroy($id)
    {
        $lesson = LessonsModel::findOrFail($id);
        $lesson->delete();

        return response()->json(['message' => 'Lesson deleted successfully.']);
    }
}
