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

Route::middleware('auth')->group(function() {
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

    Route::prefix('lodgings')->name('lodgings.')->group(function () {
        Route::get('/', 'LodgingsController@index')->name('index')->middleware('remember');
        Route::get('create', 'LodgingsController@create')->name('create');
        Route::post('/', 'LodgingsController@store')->name('store');
        Route::get('{lodging}/edit', 'LodgingsController@edit')->name('edit');
        Route::put('{lodging}', 'LodgingsController@update')->name('update');
        Route::delete('{lodging}', 'LodgingsController@destroy')->name('destroy');
        Route::put('{lodging}/restore', 'LodgingsController@restore')->name('restore');
    });
});


// Images
Route::get('/img/{path}', 'ImagesController@show')->where('path', '.*');

// Organizations
Route::get('organizations')->name('organizations')->uses('OrganizationsController@index')->middleware('remember', 'auth');
Route::get('organizations/create')->name('organizations.create')->uses('OrganizationsController@create')->middleware('auth');
Route::post('organizations')->name('organizations.store')->uses('OrganizationsController@store')->middleware('auth');
Route::get('organizations/{organization}/edit')->name('organizations.edit')->uses('OrganizationsController@edit')->middleware('auth');
Route::put('organizations/{organization}')->name('organizations.update')->uses('OrganizationsController@update')->middleware('auth');
Route::delete('organizations/{organization}')->name('organizations.destroy')->uses('OrganizationsController@destroy')->middleware('auth');
Route::put('organizations/{organization}/restore')->name('organizations.restore')->uses('OrganizationsController@restore')->middleware('auth');

// Contacts
Route::get('contacts')->name('contacts')->uses('ContactsController@index')->middleware('remember', 'auth');
Route::get('contacts/create')->name('contacts.create')->uses('ContactsController@create')->middleware('auth');
Route::post('contacts')->name('contacts.store')->uses('ContactsController@store')->middleware('auth');
Route::get('contacts/{contact}/edit')->name('contacts.edit')->uses('ContactsController@edit')->middleware('auth');
Route::put('contacts/{contact}')->name('contacts.update')->uses('ContactsController@update')->middleware('auth');
Route::delete('contacts/{contact}')->name('contacts.destroy')->uses('ContactsController@destroy')->middleware('auth');
Route::put('contacts/{contact}/restore')->name('contacts.restore')->uses('ContactsController@restore')->middleware('auth');

// Reports
Route::get('reports')->name('reports')->uses('ReportsController')->middleware('auth');

// 500 error
Route::get('500', function () {
    echo $fail;
});
