<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use Faker\Generator as Faker;

$factory->define(App\Room::class, function (Faker $faker) {
    return [
        'number' => $faker->unique()->numberBetween(1,2000),
        'length' => $faker->numberBetween(1,8),
        'width' => $faker->numberBetween(1,8),
        'facilities' => implode(',', $faker->randomElements(['AC','Bed','Bathroom','Furniture'], rand(1,4))),
        'cost_per_month' => $faker->numberBetween(1000000, 5000000)
    ];
});
