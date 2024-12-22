<?php declare(strict_types=1);

namespace App\GraphQL\Mutations;

use App\Models\Doctor;

final readonly class Doctorspet
{
    /** @param  array{}  $args */
    public function __invoke(null $_, array $args)
    {
       $doctor=Doctor::where('specialization', $args['specialization'])->get();
       return $doctor;
    }
}
