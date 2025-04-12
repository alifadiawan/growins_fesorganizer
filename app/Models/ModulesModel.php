<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class ModulesModel extends Model
{
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

    public function course()
    {
        return $this->belongsTo(CourseModel::class);
    }

    public function lessons()
    {
        return $this->hasMany(LessonsModel::class);
    }
}
