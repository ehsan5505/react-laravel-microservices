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

