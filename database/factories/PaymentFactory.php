<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Invoice;
use App\Payment;
use Faker\Generator as Faker;

$factory->define(Payment::class, function (Faker $faker) {
    return [
        'invoice_id' => factory(Invoice::class),
        'description' => $faker->sentence(8),
        'amount' => $faker->numberBetween(50000, 1500000)
    ];
});
