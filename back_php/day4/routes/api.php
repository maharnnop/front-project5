<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\API\v1\AuthController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});



Route::resource('/tip/register', 'API\v1\RegisterController'); // restful dont need @function
Route::get('/test-email', 'API\v1\RegisterController@testEmail');
Route::post('/tip/login', 'API\v1\RegisterController@checkLogin');
Route::resource('/tip/insure', 'API\v1\InsureController');
Route::resource('/tip/policy', 'API\v1\PolicyController');
Route::post('/tip/policy/user', 'API\v1\PolicyController@userPolicy');
Route::post('/tip/draft/user', 'API\v1\PolicyController@userDraft');
Route::get('/tip/load-pdf', 'API\v1\RegisterController@loadPDF');

// Route::post('/tip/register', [AuthController::class, 'login'])->name('auth.login');

//except beartoken
// Route::group(['middleware'], function () {
//     // public routes
//     Route::post('/tip/register', 'API\v1\RegisterController@store');
//     Route::post('/tip/login', 'API\v1\RegisterController@checkLogin');

// });

// // need token
// Route::middleware('auth:api')->group(function () {
//     // our routes to be protected will go in here
//     Route::resource('/tip/register', 'API\v1\RegisterController'); // restful dont need @function
// });
