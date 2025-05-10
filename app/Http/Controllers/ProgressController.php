<?php

namespace App\Http\Controllers;

use App\Models\ProgressModel;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ProgressController extends Controller
{
    public function setProgress($user_id, $lesson_id, $course_id, Request $request)
    {
        $completed = true;

        // Try to find existing progress
        $progress = ProgressModel::where('user_id', $user_id)
            ->where('course_id', $course_id)
            ->where('lesson_id', $lesson_id)
            ->first();

        if ($progress) {
            // Update existing progress
            $progress->completed = $completed;
            $progress->completed_at = $completed ? now() : null;
            $progress->save();
        } else {
            // Create new progress
            $progress = ProgressModel::create([
                'id' => Str::uuid(), // ensure you're using UUIDs
                'user_id' => $user_id,
                'course_id' => $course_id,
                'lesson_id' => $lesson_id,
                'completed' => $completed,
                'completed_at' => $completed ? now() : null,
            ]);
        }

        return response()->json(['message' => 'Progress updated', 'data' => $progress]);
    }

}
