# [Administrator Panel]

## Laravel  Validation
For User Validation
-- For Create Model to validate the fields
`php artisan make:request UserCreateRequest`

For IDE Laravel Helper [https://github.com/barryvdh/laravel-ide-helper]
`composer require --dev barryvdh/laravel-ide-helper 2.8`

then run the following commands within the API Docker
php artisan ide-helper:generate
php artisan ide-helper:models


## Laravel Passport for the Login
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


## Create A new API 
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


### Using the Foreign Key to Combine the User and Roles Table
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


## Associating the Role with the Permissions

Create the permission table that shows the  accesses
`php artisan make:migration create_permission_table`

In the Role Permission Table, the role_id and permission_id both will be foreign key
`php artisan migrate`

Create the intermediate table join the role_id and the permission_id
`php artisan make:migration create_role_permission_table`

In the Role Permission Table, the role_id and permission_id both will be foreign key
`php artisan migrate`


Create the Model
`php artisan make:model Permission`

Create the Permission Seeder to insert the different access
`php artisan make:seeder PermissionSeeder`

Execute the Seeder
`php artisan db:seed --clsas=PermissionSeeder`

Create the RolePermission Seeder that would 
`php artisan make:seeder --class=RolePermission`

### Associate the Role with the Permission
Create the RoleResource for the output variable to be shown

In the Role Model, add the permission function that hasMany relationship with the Permission
In the Permission Model, link with the Role using the belongsTo function 

In the RoleController, we could use the permissions function to bring the records of the permission allocated to the user
In The RoleResource, we could define the each attribute we want to show in the response

For the Create/Update/Delete, we have to ensure we fetch the data as array of Permission ID and must remove the entry in the role_permission for the specific role_id in the Update/Delete request

@Note!, There is hasMany relation that comes from 1 to Many vs belongsToMany that interact with Many to Many using a pivot table as intermediate relations
Role    ->   Role_Permission        -> Permission
id ->  role_id | permission_id -> id


#### Link the Permission to the User class
In the User Model, add the function permission that would return $this->role->permission->pluck('name) where pluck is a laravel function that would extract the keyvalue from the array.

Now to access the permission, in the UserController, you can use $user = \Auth::user() [it is necessary to use Auth::user() instead of User:find($id) as User find run query not function as it is listed in the Model class], 

To accomodate the permission in the API, you can use (new UserResource(...)->additional(['data'=>['permission' => $user->permissions()]]))

### Create the Permission Controller and 
`php artisan make:controller PermissionController`
`php artisan make:resource PermissionResource`
Add the route in the api to direct all permissions request to index of the controller that will show the permissions

## Role Restriction 
### on the User Page
Use laravel built in function Gates on UserController at function you want to restrict with the user type
Ex. Gates('view'), then go to the AuthProvider and define the gates as Gates::define('view',function(User $user,$model){ if $user->permissions->contains('views_{$model}')}) then it should return true that will allow the user to access
Please note on edit we also give the access right so we have to use || to allow views_{$model}|| edit_{$model}]
For the exception handleing to return JSON, go to APP/Exception/Handler.php and return $exception->getMessage, with the http code $exception->getCode() else 400 [Bad Request].
[Refactor] to Refactor the gate code, you can define hasAccess function in the User class that would have return $this->permission->contains('view_{$model}') so in the Gates we have function($user,$model){ $user->hasAccess($model)} and it will do the trick 

Same Procedure apply of Roles/Products/Orders Controller

## Create Products 
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

## Storage
For the image to be stored, you want to use the $file => $request->file('image') and /Storage::PutFileAs()
By default the file will be saved in the storage/app/<> folder where public route don't have access
To change the folder to public/app you would need to open the config/storage.php file and update the local, storage_path('....') to public_path()

To Ease the process of the post/put of the product, we segregate the image upload on separate controller, on /image, it pop up an option to upload the image and return the image url, this url should be save in the product create/update


## Order and OrderItem
Create the migration for the table definition
`php artisan make:migration create_orders_table`
`php artisan make:migration create_order_items_table`

Add your column definition, on order_item table add foreign key of order_id that will point to order table id column, then migrate
`php artisan migrate`

After migration/Schema completes, create the Model
`php artisan make:model Order`
`php artisan make:model OrderItem`

For the IDE helper create the models dummy variable to support ide
`php artisan ide:model`

Now create the Factories to create the dummy data
`php artisan make:factory OrderFactory`
`php artisan make:factory OrderItemFactory`

Create the DB Seeder to apply the factory
`php artisan make:seeder OrderSeeder`
Note: Once you create the OrderFactory seed, use each order to create the OrderItem from 1,5

Once you define Schema, just apply the Seeder
`php artisan db:seed --class=OrderSeeder`

We have to create the Order Controller
`php artisan make:controller OrderController

With the Resources
`php artisan make:resource OrderResource`
`php artisan make:resource OrderItemResource`

Now we have to create the relatonship
    Order hasMany OrderItems
    OrderItem belongs to Order

in OrderItem Model, we have to have the function of order that belongsTo orderItem
While in the Order Model we have a function of order_item->hasMany(\App\Order::class)

Once relationship completes, create the api route with only('index','show') function

!Tricks: As a short in laravel, if you use get<Name>Attribute in the Model, you can use as shortcut in Resource/Controller with <Name> as attribute, get and Attribute are reserved. Example getTotalAttribute() in Model will be $this->total in resource 

## Dashboard with Chart
To show the number of order we gain in each day, introduce the DashboardController that has a function of chart, link it in the chart route in the api endpoint

In the Chart, we would use the Orm model to make the query, you would find it on the DashboardController, T
To see the changes, we would append the created_at in the OrderFactory to see different time stamp
`php artisan db:seed --class=OrderFactory`

Now the api will return the timestamp as date with the records of sum we make in each day

## Cookie Store the Authorization Key [JWT Token]

From the AuthController, we use the cookie function in the login to store the jwt cookie, cookie(name,value,time_expire), while in the response append the cookie using the cookieWith($cookie)

In the cors (config/conrs), enable (true) the "supports_credentials"

To intercept the Cookie and append in the Header, use the Authentication middleware, in this overwrite the handle function from the base class (Authentication) and use
$token = $request->cookie('jwt')
using this token you can do, $request->headers->set('Authorization' , "Bearer ".$token);
[Note]! This function should come before the authentication so that header will have the information while authenticating....

For Logout, create the logout function tht would do the Cookie::forget(name) and return with [message: 'logout successfully'])->withCookie($cookie), where cookie is the forget one (i.e. $cookie = Cookie::forget(name))

## Queue [Rabbit MQ]
_Steps_
1. [cloudamqp.com] to create the Cloud Rabbit MQ PaaS 
2. install the plugin `composer require vladimir-yuldashev/laravel-queue-rabbitmq` for lower version (i.e. for laravel 7 append :10.*)
3. update the rabbit service in the <code>config/queue.php</code>
4. Create the Command `php artisan make:command FireEventCommand`
5. Create the Job `php artisan make:job AdminAdded` (This will trigger the action in the queue/RabbitMQ), you find the RabbitMQ app is ready state (high graph)
6. To Consume the Queue, we have to create the job on email api `php artisan make:job AdminAdded`
7. Goto the app/Provider/EventServiceProvider, leave only the boot to listen the AdminAdded.'@handle' and to trigger the handle job
8. On the command line activate the `php artisan queue:work` this will consume the event and you will notice rabbitMQ state low down