<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class QuizModel extends Model
{
    protected $table = 'quizzes';
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

    public function questions()
    {
        return $this->hasMany(Question::class, 'quiz_id');
    }
}
