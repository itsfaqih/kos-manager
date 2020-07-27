<?php

use App\User;
use App\Account;
use App\Contact;
use App\Organization;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        $account = Account::create(['name' => 'Acme Corporation']);

        factory(User::class)->create([
            'account_id' => $account->id,
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email' => 'johndoe@example.com',
            'owner' => true,
        ]);

        factory(User::class, 5)->create(['account_id' => $account->id]);

    //    $this->call(RenterSeeder::class);
    //    $this->call(RoomSeeder::class);
    //    $this->call(LodgingSeeder::class);
    //    $this->call(BillSeeder::class);
    //    $this->call(InvoiceSeeder::class);
       $this->call(PaymentSeeder::class);
    }
}
