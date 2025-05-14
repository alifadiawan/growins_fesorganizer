<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'gauth_id',
        'gauth_type',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function courses()
    {
        return $this->hasMany(CourseModel::class); // if instructor
    }

    public function enrollments()
    {
        return $this->hasMany(EnrollmentsModel::class);
    }

    public function progress()
    {
        return $this->hasMany(ProgressModel::class);
    }

    public function reviews()
    {
        return $this->hasMany(ReviewsModel::class);
    }

    public function transactions(){
        return $this->hasMany(Transaction::class, 'user_id');
    }

    // public function payments()
    // {
    //     return $this->hasMany(paymment::class);
    // }
}
