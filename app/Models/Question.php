<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Question extends Model
{
    protected $table = 'questions';
    protected $guarded = [];

    public $incrementing = false;
    protected $keyType = 'string';

    protected static function booted()
    {
        static::creating(function ($model) {
            if (empty($model->id)) {
                $model->id = (string) Str::uuid();
            }
        });
    }

    public function choices()
    {
        return $this->hasMany(Choice::class);
    }

    public function studentAnswers()
    {
        return $this->hasMany(StudentQuizAnswerDetail::class, 'question_id');
    }
}
