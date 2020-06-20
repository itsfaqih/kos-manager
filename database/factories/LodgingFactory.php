<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Lodging;
use App\Renter;
use App\Room;
use Faker\Generator as Faker;

$factory->define(Lodging::class, function (Faker $faker) {
    return [
        'room_id' => factory(Room::class),
        'renter_id' => factory(Renter::class),
        'start_at' => $faker->iso8601(),
        'end_at' => $faker->iso8601()
    ];
});
