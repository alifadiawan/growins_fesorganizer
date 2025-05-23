<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class LessonsModel extends Model
{

    protected $table = 'lessons';
    protected $guarded = [];
    protected static function booted()
    {
        static::creating(function ($model) {
            if (empty($model->id)) {
                $model->id = (string) Str::uuid();
            }
        });
    }

    public $incrementing = false;
    protected $keyType = 'string';

    public function module()
    {
        return $this->belongsTo(ModulesModel::class);
    }

    public function progress()
    {
        return $this->hasMany(ProgressModel::class);
    }

    public function quiz()
    {
        return $this->hasOne(QuizModel::class, 'lesson_id');
    }
}
