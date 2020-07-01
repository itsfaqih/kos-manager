<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */
use App\Lodging;
use App\Bill;
use Faker\Generator as Faker;

$factory->define(Bill::class, function (Faker $faker) {
    return [
        'lodging_id' => factory(Lodging::class),
        'name' => $faker->word,
        'description' => $faker->text($maxNbChars = 50),
        'amount' => $faker->numberBetween(1,10),
        'per_month' => $faker->numberBetween(50000, 1500000),
    ];
});
