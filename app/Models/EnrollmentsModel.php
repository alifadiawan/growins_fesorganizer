<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EnrollmentsModel extends Model
{
    protected $table = 'enrollments';
    protected $guarded = [];
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function course()
    {
        return $this->belongsTo(CourseModel::class);
    }
}
