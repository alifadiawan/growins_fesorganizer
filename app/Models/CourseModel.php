<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class CourseModel extends Model
{

    protected $table = 'courses';
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

    public function instructor()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function modules()
    {
        return $this->hasMany(ModulesModel::class, 'course_id')->orderBy('position');
    }

    public function tags()
    {
        return $this->belongsToMany(TagModel::class);
    }

    public function enrollments()
    {
        return $this->hasMany(EnrollmentsModel::class);
    }

    public function reviews()
    {
        return $this->hasMany(ReviewsModel::class);
    }

    public function lessons(){
        return $this->hasMany(LessonsModel::class, 'module_id')->orderBy('position');
    }

    // public function payments()
    // {
    //     return $this->hasMany(Payment::class);
    // }

}
