<?php

use App\Lodging;
use Illuminate\Database\Seeder;

class LodgingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(Lodging::class, 50)->create();
    }
}
