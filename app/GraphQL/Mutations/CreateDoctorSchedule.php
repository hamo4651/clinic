<?php declare(strict_types=1);

namespace App\GraphQL\Mutations;

use App\Models\Schedule;

final readonly class CreateDoctorSchedule
{
    /** @param  array{}  $args */
    public function __invoke(null $_, array $args)
    {
        $doctorId = $args['doctor_id'];
        $day = $args['day'];
        $startTime = new \DateTime($args['start_time']);
        $endTime = new \DateTime($args['end_time']);
        $duration = $args['duration']; // مدة الكشف بالدقائق

        if ($startTime >= $endTime) {
            throw new \InvalidArgumentException("Start time must be earlier than end time.");
        }

        // تقسيم الفترات الزمنية
        $slots = [];
        while ($startTime < $endTime) {
            $nextSlotTime = (clone $startTime)->modify("+{$duration} minutes");

            if ($nextSlotTime > $endTime) {
                break;
            }

            $slots[] = Schedule::create([
                'doctor_id' => $doctorId,
                'day' => $day,
                'start_time' => $startTime->format('H:i:s'),
                'end_time' => $nextSlotTime->format('H:i:s'),
                'duration' => $duration,
            ]);

            $startTime = $nextSlotTime;
        }

        // إرجاع آخر جدول مواعيد تم إنشاؤه
        return $slots;
    }
}
