<?php

namespace App\Http\Controllers\API\Course;

use App\Http\Controllers\Controller;
use App\Models\CourseModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class CourseAPI extends Controller
{
    // GET All Course 
    public function index()
    {
        $courses = CourseModel::with('instructor')->get();

        return response()->json([
            'success' => true,
            'data' => $courses
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'thumbnail' => 'nullable',
            'price' => 'required|numeric|min:0',
            'status' => 'in:draft,published'
        ]);

        // Handle thumbnail
        if ($request->hasFile('thumbnail')) {
            $validated['thumbnail'] = $request->file('thumbnail')
                ->store('thumbnails', 'public');
        } elseif (is_string($request->thumbnail)) {
            $validated['thumbnail'] = $request->thumbnail;
        }

        $course = CourseModel::create([
            'id' => Str::uuid(),
            'user_id' => $validated['user_id'],
            'title' => $validated['title'],
            'slug' => Str::slug($validated['title']) . '-' . Str::random(5),
            'description' => $validated['description'] ?? null,
            'thumbnail' => $validated['thumbnail'] ?? null,
            'price' => $validated['price'],
            'status' => $validated['status'] ?? 'draft'
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Course created successfully.',
            'data' => $course->title
        ], 201);
    }

    public function show($slug, $id)
    {
        $course = CourseModel::with('instructor')->find($id);

        if (!$course) {
            return response()->json(['success' => false, 'message' => 'Course not found.'], 404);
        }

        return response()->json(['success' => true, 'data' => $course]);
    }

    public function update(Request $request, $id)
    {
        $course = CourseModel::find($id);

        if (!$course) {
            return response()->json(['success' => false, 'message' => 'Course not found.'], 404);
        }

        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'thumbnail' => 'nullable|string',
            'price' => 'sometimes|required|numeric|min:0',
            'status' => 'in:draft,published'
        ]);

        $course->update(array_merge($validated, [
            'slug' => isset($validated['title']) ? Str::slug($validated['title']) . '-' . Str::random(5) : $course->slug
        ]));

        return response()->json([
            'success' => true,
            'message' => 'Course updated successfully.',
            'data' => $course
        ]);
    }

    public function delete($id)
    {
        $course = CourseModel::find($id);

        if (!$course) {
            return response()->json(['success' => false, 'message' => 'Course not found.'], 404);
        }
        if ($course->thumbnail && !filter_var($course->thumbnail, FILTER_VALIDATE_URL)) {
            Storage::disk('public')->delete($course->thumbnail);
        }

        $course->delete();

        return response()->json(['success' => true, 'message' => 'Course deleted successfully.']);
    }
}
