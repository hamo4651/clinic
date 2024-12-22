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
        'schedule_id'
    ];

    public function doctor()
    {
        return $this->belongsTo(Doctor::class);
    }

    public function schedule()
    {
        return $this->belongsTo(Schedule::class);
    }
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
