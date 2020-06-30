<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */
use App\Lodging;
use App\Bill;
use Faker\Generator as Faker;

$factory->define(Bill::class, function (Faker $faker) {
    return [
        'lodging_id' => factory(Lodging::class),
        'name' => $faker->name,
        'description' => $faker->text,
        'amount' => $faker->numberBetween(1,10),
        'per_month' => $faker->numberBetween(1,10),
    ];
});
