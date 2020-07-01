<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Auth
Route::get('login')->name('login')->uses('Auth\LoginController@showLoginForm')->middleware('guest');
Route::post('login')->name('login.attempt')->uses('Auth\LoginController@login')->middleware('guest');
Route::post('logout')->name('logout')->uses('Auth\LoginController@logout');

// Dashboard
Route::get('/')->name('dashboard')->uses('DashboardController')->middleware('auth');

Route::middleware('auth')->group(function () {
    // Users
    Route::prefix('users')->name('users.')->group(function () {
        Route::get('/', 'UsersController@index')->name('index')->middleware('remember');
        Route::get('create', 'UsersController@create')->name('create');
        Route::post('/', 'UsersController@store')->name('store');
        Route::get('{user}/edit', 'UsersController@edit')->name('edit');
        Route::put('{user}', 'UsersController@update')->name('update');
        Route::delete('{user}', 'UsersController@destroy')->name('destroy');
        Route::put('{user}/restore', 'UsersController@restore')->name('restore');
    });
    // Rooms
    Route::prefix('rooms')->name('rooms.')->group(function () {
        Route::get('/', 'RoomsController@index')->name('index')->middleware('remember');
        Route::get('create', 'RoomsController@create')->name('create');
        Route::post('/', 'RoomsController@store')->name('store');
        Route::get('{room}/edit', 'RoomsController@edit')->name('edit');
        Route::put('{room}', 'RoomsController@update')->name('update');
        Route::delete('{room}', 'RoomsController@destroy')->name('destroy');
        Route::put('{room}/restore', 'RoomsController@restore')->name('restore');
    });
    // Renters
    Route::prefix('renters')->name('renters.')->group(function () {
        Route::get('/', 'RentersController@index')->name('index')->middleware('remember');
        Route::get('create', 'RentersController@create')->name('create');
        Route::post('/', 'RentersController@store')->name('store');
        Route::get('{renter}/edit', 'RentersController@edit')->name('edit');
        Route::put('{renter}', 'RentersController@update')->name('update');
        Route::delete('{renter}', 'RentersController@destroy')->name('destroy');
        Route::put('{renter}/restore', 'RentersController@restore')->name('restore');
    });

     // Invoices
     Route::prefix('invoices')->name('invoices.')->group(function () {
        Route::get('/', 'InvoicesController@index')->name('index')->middleware('remember');
        Route::get('create', 'InvoicesController@create')->name('create');
        Route::post('/', 'InvoicesController@store')->name('store');
        Route::get('{invoice}/edit', 'InvoicesController@edit')->name('edit');
        Route::put('{invoice}', 'InvoicesController@update')->name('update');
        Route::delete('{invoice}', 'InvoicesController@destroy')->name('destroy');
        Route::put('{invoice}/restore', 'InvoicesController@restore')->name('restore');
    });

    // Bills
    Route::prefix('bills')->name('bills.')->group(function () {
        Route::get('/', 'BillsController@index')->name('index')->middleware('remember');
        Route::get('create', 'BillsController@create')->name('create');
        Route::post('/', 'BillsController@store')->name('store');
        Route::get('{bill}/edit', 'BillsController@edit')->name('edit');
        Route::put('{bill}', 'BillsController@update')->name('update');
        Route::delete('{bill}', 'BillsController@destroy')->name('destroy');
        Route::put('{bill}/restore', 'BillsController@restore')->name('restore');
    });
        
    // Lodgings
    Route::prefix('lodgings')->name('lodgings.')->group(function () {
        Route::get('/', 'LodgingsController@index')->name('index')->middleware('remember');
        Route::get('create', 'LodgingsController@create')->name('create');
        Route::post('/', 'LodgingsController@store')->name('store');
        Route::get('{lodging}/edit', 'LodgingsController@edit')->name('edit');
        Route::put('{lodging}', 'LodgingsController@update')->name('update');
        Route::delete('{lodging}', 'LodgingsController@destroy')->name('destroy');
        Route::put('{lodging}/restore', 'LodgingsController@restore')->name('restore');
    });
        
    // Payments
    Route::prefix('payments')->name('payments.')->group(function () {
        Route::get('/', 'PaymentsController@index')->name('index')->middleware('remember');
        Route::get('create', 'PaymentsController@create')->name('create');
        Route::post('/', 'PaymentsController@store')->name('store');
        Route::get('{payment}/edit', 'PaymentsController@edit')->name('edit');
        Route::put('{payment}', 'PaymentsController@update')->name('update');
        Route::delete('{payment}', 'PaymentsController@destroy')->name('destroy');
        Route::put('{payment}/restore', 'PaymentsController@restore')->name('restore');
    });
});


// Images
Route::get('/img/{path}', 'ImagesController@show')->where('path', '.*');

// 500 error
// Route::get('500', function () {
//     echo $fail;
