<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use Faker\Generator as Faker;

$factory->define(\App\Product::class, function (Faker $faker) {
    return [
        'title' => $faker->text(30),
        'description' => $faker->text(),
        'imageUrl'  => $faker->imageUrl(),
        'price' => $faker->numberBetween(1,100)
    ];
});
