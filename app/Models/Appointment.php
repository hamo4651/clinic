<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Appointment extends Model
{
   
    protected $fillable = [
        'doctor_id',
        'user_id',
        'appointment_date',
        'notes',
        'status',
    ];

    public function doctor()
    {
        return $this->belongsTo(Doctor::class);
    }

    // علاقة مع جدول المستخدمين (المرضى)
    public function user()
    {
        return $this->belongsTo(User::class);
    }

}
