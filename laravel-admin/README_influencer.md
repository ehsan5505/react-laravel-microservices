# Setting Up the Influencer App
*Objective*
_Influencer is a separate app from the Admin app which revolve around the influence we create and offer for the product_

*Docker_compose*
In docker_compose.yml file, we need to remove the container (i.e. admin-api and admin_db) and chanage the database name from admin to influencer

Run the docker file
`docker-compose up`

It will return with an error to indicate the database/migrate are setup
we would need to access the container that running the database, and access the database using the credentials to create the database
`create database influencer`

!Access the Backend PHP Server from the Docker and then execute
Now we need to run the migration
`php artisan db:migrate`

Setup the passport by running
`php artisan passport:install`

Now run the seeding
`php artisan db:seed`

You API should be up and running now

*Refactor*
To segregate the Admin and the influencer API, we have to separate the Controller ahd API config of the laravel app, 

_For the API_
We would need to open the routes/api.php file and from the route.group(middleware), we have to add the prefix parameter of admin, that would ensure that route will pass via http://endpoint/admin/<request>

_For the Admin Controller_
To separate the Admin controller, in the App/Http/Controller create an Admin folder and pass all the controller that belong to the Admin API to this folder, change the namespace given at the first line to point to the new folder (i.e. append /Admin at the end).
In the Config/routes. and the namespace parameter and it would be Admin, this will ensure that API will look for the Admin folder for the controller

_CleanUp_
We don't need the Controller.php file form the Http/App/Controller, so it should be deleted and all the other controller that are extending from this controller should be updated (remove the extend).


### Influencer Controller
*Product Controller*
Create the product controller for the influencer by running the command
`php artisan make:controller Influencer/Product`


#### Create a UserRole and remove the Role_ID from the User
*Create the User Role Table*
`php artisan make:migration create_user_role_table`
_With Migrate we need to seed the data as well to fill all the information_ 

Create 2 column for user_id and role_id table, then add the foreign key on both columns
`php artisan migrate`

Create the Model of UserRole and add the Models from the IDE helper
`php artisan make:model UserRole`
`php artisan ide:models`

In the UserRole table, timestamps is false as we don;t offer the date in table, and guarded the id

In the User Table for the role function, we need to change the _BelongsTo_ to _hasOneThrough_ that will need 
User `hasOneThrough(Role::class,UserRole::class,'user_id','<ID Column From User>','<ID Column from Role>','role_id');` 

Now we can drop column of role_id from the User table
`php artisan make:migration remove_role_id_from_the_users_table` 


#### Scopes
*Objective*
To segregate the Influencer to access the Admin routes, we could introduce the Scope in Passport, for now, there would 2 types of scopes
1. Admin
2. Influencer

Admin could access the admin routes as well influencer routes while the influence would only be allow to access the influencer routes

For this we would need to do the following

1. Add 2 middleware in the Kernel.php one is scope and second (CheckForAnyScope) is scopes (CheckScopes)
2. In the route, in the middleware, we can add the scope:admin
3. In the AuthServiceProvider, we need to add both the scope as the tokensCan
4. In the AuthProvide in the login() with the scope as input in the createToken
!Note: There are lot of time spend to learn in Postman cookie should be remove, cookie store will retain the old Token which cause issue while using the scope token

#### Link/LinkProduct
*Objective*
Link and LinkProduct will return the link to the influencer that will return the product for the audience to use on checkout, influencer will earn

_Steps_
1. `php artisan make:migration create_links_table`
2. `php artisan make:migration create_link_products_table`
   Use the link_id that point to the links and product_id that point to id to the product table
3. `php artisan make:model Link`
4. `php artisan make:model Influencer/LinkProduct`
5. `php artisan ide:models`
6. `php artisan make:controller Link`
7. In the route of the influencer, had the post of store of LinkController table

#### Event / Listender
*Objective*
To reactor code to dispatch the event and listener separate so that when event occur listener will trigger the task

We want to introduce OrderComplete event that will trigger emails to listeners for the we follow steps

_Steps_
1. Create blade views as email template in the resources/view/influencers, the files are admin.blade.php and influencer.blade.php
2. `php artisan make:event OrderCompletedEvent`
3. `php artisan make:listener NotifyAdminListener`
4. `php artisan make:listener NotifyInfluencerListener`
5. Now in the controller you can introduce the event() function the the OrderCompletedEvent as parameter
6. In the EventServiceProvide of Provider folder, you can define the OrderCompletedEvent with the listener you want to trigger
7. In the email ListenerClass, in handle function you can define the task you want to fullfill i.e. email 


#### Command
*Objective*
The command is the cli command that will trigger the function we want, in this case, we want to store the information of the revenue based on the ranking

_Steps_
1. `php artisan make:command UpdateRankingCommand`
2. Now we have to update the UpdateRankingCommand File with the redis.zadd() information
3. Run the command on client to calculate the ranking of every influencer
4. `php artisan update:ranking`
5. For the Order complete, we have to introduce a listener that will add the new revenue in the list
6. `php artisan make:listener RankingListener`
7. In the RankingListener handle function, we have to update the order->influencer_revenue and user->full_name using Redis::incr() 