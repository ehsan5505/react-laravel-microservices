## To Segreate the User Management
The intention of this microservce is to seprate the user management from the Main Service, this will help to have a central user management that would authenticate different services and enhance the service in one place.

*Create the Laravel Application*
`composer require laravel/laravel users`

*Install the IDE Generate*
`composer require barryvdh/laravel-ide-helper`
`php artisan ide:generate`

Once this complete we have to copy the migration from the laravel-influcer service to the migration of the users service including the additional changes (or migration that we perform later) i.e. is_fluencer column

Once done, you can copy the Docker and docker-compose.yml file from the email microservice and change the database name from db => users_db and command to `php artisan serve` on port 8001 with the database port 30688

*Run the docker compose to up and run the micro-service*
`docker-compose up --build`

*Now we have to migrate the service from the docker container that running the user micro-service*
`php artisan migrate`

*Copy the User Model from the Laravel-Inluencer to the User Microserver User Model and remove the rest of the function except the isAdmin and IsInfluencer*

After cleansing the code install the laravel/passport 
`composer require laravel/passport`

Goto the config/auth.php file and change the driver of api from token or session to "passport"
Goto the Provider/AuthProvider.php and in the boot function append at the end Passport::routes();
For the Scopes to declare, we need to copy the scopes (i.e. influencer and admin) from the AuthProvider of laravel-influencer microservice to users microservice in AuthProvider file

Once the commit complete, execute the command
`php artisan migrate`
`php artisan passport:install`
_Please run it inside the docker container that running the user microservice_
Note: In the docker-compose we have to define the volume with the service that would be - .:/app