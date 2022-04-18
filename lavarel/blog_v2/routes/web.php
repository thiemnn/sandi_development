<?php

use Illuminate\Support\Facades\Route;

Route::get('/filemanager', function () {;
    return view('filemanager');
});

Route::group(['prefix' => 'laravel-filemanager'], function () {
    \UniSharp\LaravelFilemanager\Lfm::routes();
});

Route::get('insert_product','ProductController@insertform');
Route::post('create_product','ProductController@insert');
Route::get('list_product','ProductController@list');
Route::get('edit_product/{id}','ProductController@editform');
Route::post('update_product_overview/{id}','ProductController@update_overview');
Route::post('update_product_data/{id}','ProductController@update_data');
Route::post('update_product_link/{id}','ProductController@update_link');
Route::post('update_product_images/{id}','ProductController@update_images');
Route::post('update_product_characteristic/{id}','ProductController@update_characteristic');
Route::post('update_product_filter_option/{id}','ProductController@update_filter_option');
Route::get('/','ProductController@list');

Route::get('insert_category','CategoryController@insertform');
Route::post('create_category','CategoryController@insert');
Route::get('list_category','CategoryController@list');
Route::get('edit_category/{id}','CategoryController@editform');
Route::post('update_category/{id}','CategoryController@update');

Route::get('insert_menu','MenuController@insertform');
Route::post('create_menu','MenuController@insert');
Route::get('list_menu','MenuController@list');
Route::get('edit_menu/{id}','MenuController@editform');
Route::post('update_menu/{id}','MenuController@update');

Route::get('insert_news_category','NewsCategoryController@insertform');
Route::post('create_news_category','NewsCategoryController@insert');
Route::get('list_news_category','NewsCategoryController@list');
Route::get('edit_news_category/{id}','NewsCategoryController@editform');
Route::post('update_news_category/{id}','NewsCategoryController@update');

Route::get('insert_news','NewsController@insertform');
Route::post('create_news','NewsController@insert');
Route::get('list_news','NewsController@list');
Route::get('edit_news/{id}','NewsController@editform');
Route::post('update_news_overview/{id}','NewsController@update_overview');
Route::post('update_news_link/{id}','NewsController@update_link');

Route::get('insert_filter','FilterController@insertform');
Route::post('create_filter','FilterController@insert');
Route::get('list_filter','FilterController@list');
Route::get('edit_filter/{id}','FilterController@editform');
Route::post('update_filter/{id}','FilterController@update');
