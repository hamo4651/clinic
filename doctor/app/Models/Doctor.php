<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class Doctor extends Model
{
    use HasApiTokens ;
    protected $fillable = [
        'specialization',
        'bio',
        'phone',
        'user_id',
        'clinic_address',
        'fee'

    ];
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // علاقة مع جدول الجداول الزمنية (Schedules)
    public function schedules()
    {
        return $this->hasMany(Schedule::class);
    }

    // علاقة مع جدول المواعيد
    public function appointments()
    {
        return $this->hasMany(Appointment::class);
    }
}
