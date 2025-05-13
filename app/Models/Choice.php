<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Choice extends Model
{
    protected $table = 'choices';
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
        return $this->hasMany(Choice::class, 'question_id');
    }
}
