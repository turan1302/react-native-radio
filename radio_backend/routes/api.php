<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::group(['prefix'=>'client','as'=>'client.'],function (){
    Route::post('login',[\App\Http\Controllers\api\auth\indexController::class,'login'])->name('login');
    Route::post('register',[\App\Http\Controllers\api\auth\indexController::class,'register'])->name('register');

    Route::group(['middleware'=>'auth:api_client'],function (){
        Route::get('profile',[\App\Http\Controllers\api\auth\indexController::class,'profile'])->name('profile');
        Route::post('update',[\App\Http\Controllers\api\auth\indexController::class,'update'])->name('update');
        Route::post('update-profile',[\App\Http\Controllers\api\auth\indexController::class,'update_profile'])->name('update_profile');
        Route::get('check',[\App\Http\Controllers\api\auth\indexController::class,'check'])->name('check');
        Route::get('logout',[\App\Http\Controllers\api\auth\indexController::class,'logout'])->name('logout');
    });
});

Route::group(['prefix'=>'home','middleware'=>'auth:api_client','as'=>'home.'],function (){
    Route::get('',[\App\Http\Controllers\api\home\indexController::class,'index'])->name('index');
    Route::post('set-favourite',[\App\Http\Controllers\api\home\indexController::class,'set_favourite'])->name('set_favourite');
});

Route::group(['prefix'=>'radio','middleware'=>'auth:api_client','as'=>'radio.'],function (){
    Route::get('categories',[\App\Http\Controllers\api\radio\indexController::class,'categories'])->name('categories');
    Route::post('set-radio',[\App\Http\Controllers\api\radio\indexController::class,'set_radio'])->name('set_radio');
    Route::post('remove-radio',[\App\Http\Controllers\api\radio\indexController::class,'remove_radio'])->name('remove_radio');
});

