<?php

use Faker\Generator as Faker;

$factory->define(App\Organization::class, function (Faker $faker) {
    return [
        'name' => $faker->company,
        'email' => $faker->companyEmail,
        'phone' => $faker->phoneNumber,
        'address' => $faker->streetAddress,
        'city' => $faker->city,
        'region' => $faker->state,
        'country' => 'US',
        'postal_code' => $faker->postcode,
    ];
});
