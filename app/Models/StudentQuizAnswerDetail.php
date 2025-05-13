<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StudentQuizAnswerDetail extends Model
{

    protected $table = 'student_quiz_answer_details';
    protected $guarded = [];

    public function question()
    {
        return $this->belongsTo(Question::class);
    }

    public function choice()
    {
        return $this->belongsTo(Choice::class);
    }

    public function answer()
    {
        return $this->belongsTo(StudentQuizAnswer::class, 'student_quiz_answer_id');
    }
}
