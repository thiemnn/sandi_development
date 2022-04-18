<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;
use App\Http\Requests;
use App\Http\Controllers\Controller;

class MenuController extends Controller
{    
    public function insertform(){
        $items = DB::select('select id, parent_id, name from menus');
        $menus = getAllMenus($items);  
        return view('menu/create', ['menus' => $menus]);
    }
    public function insert(Request $request){
        $name = $request->input('name');
        $parent_id = $request->input('parent_id');
        $data=array(
            'name'=>$name,
            "parent_id"=>$parent_id
        );
        DB::table('menus')->insert($data);
        return redirect('/list_menu');
    }
    public function list()
    {
        $items = DB::select('select id, parent_id, name from menus');
        $menus = getAllMenus($items);        
        return view('menu/list',['menus'=>$menus]);
    }
    public function editform($id)
    {        
        $items = DB::select('select id, parent_id, name from menus');
        $menus = getAllMenus($items); 
        $menu = DB::select('select * from menus where id = ' . $id)[0];
        $menu_types = DB::select('select id, name from menu_type');
        $items = DB::select('select * from categories');
        $categories = getAllCategories($items); 
        $products = DB::select('select id, name from products');    
        $static_pages =  DB::select('select id, name from static_pages'); 
        $news_categories =  DB::select('select id, name from news_categories'); 
        $news =  DB::select('select id, title from news'); 

        return view('menu/edit', 
        [
            'menu'=>$menu, 
            'menus'=>$menus, 
            'menu_types'=>$menu_types, 
            'categories'=>$categories, 
            'products'=>$products, 
            'static_pages'=>$static_pages, 
            'news_categories'=>$news_categories , 
            'news'=>$news  
        ]);
    }

    public function update(Request $request, $id)
    {
        $name = $request->input('name');
        $parent_id = $request->input('parent_id');
        $type_id = $request->input('type_id');
        $category_id = $request->input('category_id');
        $product_id = $request->input('product_id');
        $static_page_id = $request->input('static_page_id');
        $news_category_id = $request->input('news_category_id');
        $news_id = $request->input('news_id');
        $relation_id = null;
        switch($type_id){
            case 1:
                $relation_id = $category_id;
                break;
            case 2:
                $relation_id = $product_id;
                break;
            case 3:
                $relation_id = $news_category_id;
                break;
            case 4:
                $relation_id = $news_id;
                break;
            case 5:
                $relation_id = $static_page_id;
                break;
        }
        $data=array(
            'name'=>$name,
            "parent_id"=>$parent_id,
            "type"=>$type_id,
            "relation_id"=>$relation_id
        );
        DB::table('menus')->where('id',$id)->update($data);
        return redirect('/list_menu');
    }
}