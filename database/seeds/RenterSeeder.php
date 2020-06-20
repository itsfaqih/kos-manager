<?php

use Illuminate\Database\Seeder;
use App\Renter;

class RenterSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(Renter::class, 50)->create(); 
    }
}
