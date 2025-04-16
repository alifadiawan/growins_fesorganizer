<?php

namespace App\Http\Controllers\API\Course;

use App\Http\Controllers\Controller;
use App\Models\ModulesModel;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ModulesAPI extends Controller
{
    public function index()
    {
        $modules = ModulesModel::with('course')->get();

        return response()->json([
            'success' => true,
            'data' => $modules
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'course_id' => 'required|exists:courses,id',
            'title' => 'required|string|max:255',
            'position' => 'required|integer',
            // 'is_free' => 'required|boolean'
        ]);

        $module = ModulesModel::create([
            'id' => Str::uuid(),
            'course_id' => $validated['course_id'],
            'title' => $validated['title'],
            'position' => $validated['position'],
            // 'is_free' => $validated['is_free'],
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Module created successfully.',
            'data' => $module
        ], 201);
    }

    public function show($id)
    {
        $module = ModulesModel::with('course')->find($id);

        if (!$module) {
            return response()->json(['success' => false, 'message' => 'Module not found.'], 404);
        }

        return response()->json(['success' => true, 'data' => $module]);
    }

    public function update(Request $request, $id)
    {
        $module = ModulesModel::find($id);

        if (!$module) {
            return response()->json(['success' => false, 'message' => 'Module not found.'], 404);
        }

        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'position' => 'sometimes|required|integer',
            'is_free' => 'sometimes|required|boolean'
        ]);

        $module->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Module updated successfully.',
            'data' => $module
        ]);
    }

    public function destroy($id)
    {
        $module = ModulesModel::find($id);

        if (!$module) {
            return response()->json(['success' => false, 'message' => 'Module not found.'], 404);
        }

        $module->delete();

        return response()->json(['success' => true, 'message' => 'Module deleted successfully.']);
    }

}
