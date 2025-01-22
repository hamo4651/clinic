<?php declare(strict_types=1);

namespace App\GraphQL\Mutations;

use App\Models\Appointment;

final readonly class UpdateStatus
{
    /** @param  array{}  $args */
    public function __invoke(null $_, array $args)
    {
      $appointment = Appointment::where('id',$args['id'])->first();
      $appointment->update([
       'status'=>$args['status']
      ]
      );
      $appointment->schedule->is_reserved = false;
      $appointment->delete(); 
      
      return $appointment;
    }
}
