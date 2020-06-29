<?php

use Illuminate\Database\Seeder;
use App\Room;
class RoomSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(Room::class, 100)->create();
    }
}
