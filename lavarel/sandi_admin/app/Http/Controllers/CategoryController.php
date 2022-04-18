<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;
use App\Http\Requests;
use App\Http\Controllers\Controller;

class CategoryController extends Controller
{    
    public function insertform(){
        $items = DB::select('select id, parent_id, name, image from categories');
        $categories = getAllCategories($items);  
        return view('category/create', ['categories' => $categories]);
    }
    public function insert(Request $request){
        $name = $request->input('name');
        $url_seo = stripVN($name);
        $description = $request->input('description');
        $meta_title = $request->input('meta_title');
        $meta_desc = $request->input('meta_desc');
        $meta_tag = $request->input('meta_tag');
        $parent_id = $request->input('parent_id');
        $image = $request->input('image');
        $data=array(
            'name'=>$name,
            'url_seo'=>$url_seo,
            "description"=>$description,
            "meta_title"=>$meta_title,
            "meta_desc"=>$meta_desc,
            "meta_tag"=>$meta_tag,
            "parent_id"=>$parent_id,
            "image"=>$image
        );
        $id = DB::table('categories')->insertGetId($data);
        DB::table('url_seo_list')->updateOrInsert(['url_seo'=>$url_seo],["url_type"=>1, "relation_id"=>$id]);
        return redirect('/list_category');
    }
    public function list()
    {
        $items = DB::select('select id, parent_id, name, image from categories');
        $categories = getAllCategories($items);        
        return view('category/list',['categories'=>$categories]);
    }
    public function editform($id)
    {        
        $items = DB::select('select id, parent_id, name, image from categories');
        $categories = getAllCategories($items);  
        $category = DB::select('select * from categories where id = ' . $id)[0];
        return view('category/edit', ['category'=>$category, 'categories'=>$categories]);
    }

    public function update(Request $request, $id)
    {
        $name = $request->input('name');
        $url_seo = stripVN($name);
        $description = $request->input('description');
        $meta_title = $request->input('meta_title');
        $meta_desc = $request->input('meta_desc');
        $meta_tag = $request->input('meta_tag');
        $parent_id = $request->input('parent_id');
        $image = $request->input('image');
        $data=array(
            'name'=>$name,
            'url_seo'=>$url_seo,
            "description"=>$description,
            "meta_title"=>$meta_title,
            "meta_desc"=>$meta_desc,
            "meta_tag"=>$meta_tag,
            "parent_id"=>$parent_id,
            "image"=>$image
        );
        DB::table('categories')->where('id',$id)->update($data);
        DB::table('url_seo_list')->updateOrInsert(['url_seo'=>$url_seo],["url_type"=>1, "relation_id"=>$id]);
        return redirect('/list_category');
    }
}