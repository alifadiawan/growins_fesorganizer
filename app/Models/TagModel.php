<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TagModel extends Model
{
    public function courses()
    {
        return $this->belongsToMany(CourseModel::class);
    }
}
