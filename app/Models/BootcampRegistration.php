<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class BootcampRegistration extends Model
{

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
}
