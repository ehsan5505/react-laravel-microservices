<?php

namespace App\Providers;
use Laravel\Passport\Passport;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;
use Laravel\Passport\Passport;


class AuthServiceProvider extends ServiceProvider
{
    
    public function boot()
    {
        $this->registerPolicies();

        Passport::routes();

        Passport::tokensCan([
            'admin' =>  "Admin Scope",
            'influencer' =>  "Influencer Scope"
        ]);

        // Passport::routes();

        // Gate::define('view', function (User $user, $model) {
        //     return $user->hasAccess("view_{$model}") || $user->hasAccess("edit_{$model}");
        // });

        // Gate::define('edit', function (User $user, $model) {
        //     return $user->hasAccess("edit_{$model}");
        // });

    }
}
