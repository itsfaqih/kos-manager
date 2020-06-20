<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use Faker\Generator as Faker;

$factory->define(App\Room::class, function (Faker $faker) {
    return [
        'number' => $faker->unique(true)->numberBetween(1,12),
        'length' => $faker->numberBetween(1,10),
        'width' => $faker->numberBetween(1,10),
        'facilities' => $faker->randomElement(['AC','Bed','Bathroom','Furniture']),
        'cost_per_month' => $faker->numberBetween(1000000, 5000000)
    ];
});
