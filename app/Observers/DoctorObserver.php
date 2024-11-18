<?php

namespace App\Observers;

use App\Models\Doctor;

class DoctorObserver
{
    /**
     * Handle the Doctor "created" event.
     */
    public function created(Doctor $doctor): void
    {
        $doctor->user->role = 'doctor';
        $doctor->user->save();
    }

    /**
     * Handle the Doctor "updated" event.
     */
    public function updated(Doctor $doctor): void
    {
        //
    }

    /**
     * Handle the Doctor "deleted" event.
     */
    public function deleted(Doctor $doctor): void
    {
       $doctor->user->delete();
    }

    /**
     * Handle the Doctor "restored" event.
     */
    public function restored(Doctor $doctor): void
    {
        //
    }

    /**
     * Handle the Doctor "force deleted" event.
     */
    public function forceDeleted(Doctor $doctor): void
    {
        //
    }
}
