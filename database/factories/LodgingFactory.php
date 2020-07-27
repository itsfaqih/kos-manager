<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Lodging;
use App\Renter;
use App\Room;
use Faker\Generator as Faker;

$factory->define(Lodging::class, function (Faker $faker) {
    $startDate = $faker->dateTimeBetween('-1 years', '6 months');
    return [
        'room_id' => factory(Room::class),
        'renter_id' => factory(Renter::class),
        'start_at' => $startDate,
        'end_at' => $faker->dateTimeInInterval($startDate, '6 months')
    ];
});
