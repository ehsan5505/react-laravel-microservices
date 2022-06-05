

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


### Create A new API 
Create the Migrate to create the migrate table
`php artisan make:migration create_roles_tables`

Now append the rules that you want in the table in the create roles_table

Once complete, you can run the migrate to apply/create the schema in db
`php artisan migrate`

Create the mode to interact with the table
`php artisan make:model Roles`

Now for the Ide to understand the function we have to update the ide models
`php artisan ide:model`

Create the Controller with default route function builtin
`php artisan make:controller RoleController --api`

Now create the default route in the API routes file
`Route::apiResources('roles','RoleController');`
