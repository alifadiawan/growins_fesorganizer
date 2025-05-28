<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class BootcampClassModel extends Model
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
    protected $guarded = [];
    protected $table = 'bootcamp_class';
    
    public function bootcamp()
    {
        return $this->belongsTo(Bootcamp::class, 'bootcamp_id');
    }

}
