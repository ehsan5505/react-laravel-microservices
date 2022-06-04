

For User Validation
-- For Create Model to validate the fields
`php artisan make:request UserCreateRequest`

For IDE Laravel Helper [https://github.com/barryvdh/laravel-ide-helper]
`composer require --dev barryvdh/laravel-ide-helper 2.8`

then run the following commands within the API Docker
php artisan ide-helper:generate
php artisan ide-helper:models


### Laravel Passport for the Login
install
`composer require laravel/passport:^9`

On Terminal of the API run the migrate
`php artisan migrate`

Once the migration completes, install the passport
`php artisan passport:install`

Add the following commit in the User.php file
`use HasApiTokens, <previousvalues> `

In AuthServiceProvider add the comment
`Passport::routes();`

Change the config/auth.php for the api
        'api' => [
            'driver' => 'passport',
            'provider' => 'users',
            'hash' => false,
        ],

Congrats for completing the passport installation, now create the AuthController
`php artisan make:controller AuthController`



