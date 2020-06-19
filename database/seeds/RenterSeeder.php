<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
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
        $renters = factory(Renter::class, 50)
            ->create(); 
    }
}
