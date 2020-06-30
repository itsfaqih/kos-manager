<?php
/** @var \Illuminate\Database\Eloquent\Factory $factory */
use App\Invoice;
use App\Bill;
use Faker\Generator as Faker;

$factory->define(Invoice::class, function (Faker $faker) {
    return [
        'bill_id' => factory(Bill::class)
    ];
});