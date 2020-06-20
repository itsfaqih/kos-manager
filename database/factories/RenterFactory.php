<?php

use Faker\Generator as Faker;

$factory->define(App\Renter::class, function (Faker $faker) {
    return [
        'nik' => $faker->nik(),
        'name' => $faker->name,
        'gender' => $faker->randomElement(['Laki-laki', 'Perempuan']),
        'phone_number' => $faker->phoneNumber,
        'address' => $faker->streetAddress,
    ];
});
