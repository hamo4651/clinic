<?php

namespace App\Observers;

use App\Models\Appointment;

class appointmentobserver
{
    /**
     * Handle the Appointment "created" event.
     */
    public function created(Appointment $appointment): void
    {
        $appointment->schedule->is_reserved = true;
        $appointment->schedule->save();

    }

    /**
     * Handle the Appointment "updated" event.
     */
    public function Update(Appointment $appointment): void
    {
        // $appointment->schedule->is_reserved = false;
        // $appointment->schedule->save();  
      }

    /**
     * Handle the Appointment "deleted" event.
     */
    public function deleted(Appointment $appointment): void
    {
        $appointment->schedule->is_reserved = false;
        $appointment->schedule->save();

    }

    /**
     * Handle the Appointment "restored" event.
     */
    public function restored(Appointment $appointment): void
    {
        //
    }

    /**
     * Handle the Appointment "force deleted" event.
     */
    public function forceDeleted(Appointment $appointment): void
    {
        //
    }
}
