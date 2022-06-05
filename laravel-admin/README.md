

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


#### Using the Foreign Key to Combine the User and Roles Table
create the migraion first that would alter the user table to add the column
`php artisan make:migration add_column_role_id_in_users`

It should auto-detect the user table and offer the column, use the foreign('role_id')->references('id').on('roles). Also update the down to drop the Dropforeign(['']) and column dropColumn 

Note! Before running the migration, note that you already fill the users able and adding role_id forign will interrupt/fail as it should be not empty, to avoid this we have to create the seeder
`php artisan migrate:fresh`

    Seeder (fake data to fill the database or entry)
    Role Seeder: `php artisan make:seeder Roles`
    In the roles Seeder Table, you have to make entry (i.e. Admin, Department, Employee)

    On the UserSeed file, you can add the reference to pick the role_id random order from the Roles table
    Go to the Roles column and add the seeder of \Auth::Role->RandomOrder()->first()->id;

    Link The Role Seeder, open the DatabaseSeeder file and add the RoleSeeder Before the User Seeder

    Run the seed command to generate the data
    `php artisan db:seed`

    Tip: In between if you lose your precious data, run `compser auto-load`

!Use of Resource
Resources are created by
`php artisan make:resource <UserResource>`

In the resource, you can hide or show the columns you want to appear in the API, i.e. if you don;t want to show the role_id, you don;t define in the Resource file
To use it use new UserResource($user) or for collection use UserResource::collection($users)

Note! In case you happen to drop the table or run migrate:fresh

`php artisan passport:install`

#### Create Products 
create the migration tables for the product table
`php artisan make:migration create_products_table`

Fill the columns you want in the table in the create_products_table, to create the schema execute
`php artisan migrate`

Once the schema create, you would need to create the Model
`php artisan make:model Product`

Now Update the IDE to create the dummy function of the model for the IDE support
`php artisan ide:model`

Once the Model create we have to create the factory for the dummy data
`php artisan make:factory ProductFactory`

To execute the dummy factory data, we have to run the DatabaseSeeder
`php artisan make:seeder ProductSeeder`

With the Seeder list the factory and the records to be generate run the following command
`php artisan db:seed --class=ProductSeeder`

Now you have the Product data in the products table on your database

Create the API Routes, for this first create the Controller with apis
`php artisan make:controller ProductController --api`

For the view, we have to also create the Resource
`php artisan make:resource ProductResource`