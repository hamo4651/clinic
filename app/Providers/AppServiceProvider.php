<?php

namespace App\Providers;

use App\Models\Appointment;
use App\Models\Doctor;
use App\Observers\DoctorObserver;
use GraphQL\Type\Definition\Type;
// use GraphQL\Type\Definition\Type;
use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        ResetPassword::createUrlUsing(function (object $notifiable, string $token) {
            return config('app.frontend_url')."/password-reset/$token?email={$notifiable->getEmailForPasswordReset()}";
        });
        Doctor::observe(DoctorObserver::class);
        Appointment::observe(new \App\Observers\appointmentobserver());
    }
}
