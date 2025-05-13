<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StudentQuizAnswer extends Model
{
    protected $table = 'student_quiz_answers';
    protected $guarded = [];

    public function questionAnswers()
    {
        return $this->hasMany(StudentQuizAnswerDetail::class);
    }
}
