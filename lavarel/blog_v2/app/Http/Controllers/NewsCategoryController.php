<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;
use App\Http\Requests;
use App\Http\Controllers\Controller;

class NewsCategoryController extends Controller
{    
    public function insertform(){
        return view('news_category/create');
    }
    public function insert(Request $request){
        $name = $request->input('name');
        $url_seo = stripVN($name);
        $description = $request->input('description');
        $meta_title = $request->input('meta_title');
        $meta_desc = $request->input('meta_desc');
        $meta_tag = $request->input('meta_tag');
        $image = $request->input('image');
        $data=array(
            'name'=>$name,
            'url_seo'=>$url_seo,
            "description"=>$description,
            "meta_title"=>$meta_title,
            "meta_desc"=>$meta_desc,
            "meta_tag"=>$meta_tag,
            "image"=>$image
        );
        $id = DB::table('news_categories')->insertGetId($data);
        DB::table('url_seo_list')->updateOrInsert(['url_seo'=>$url_seo],["url_type"=>3, "relation_id"=>$id]);
        return redirect('/list_news_category');
    }
    public function list()
    {
        $news_categories = DB::select('select * from news_categories');
        return view('news_category/list',['news_categories'=>$news_categories]);
    }
    public function editform($id)
    {        
        $news_category = DB::select('select * from news_categories where id = ' . $id)[0];
        return view('news_category/edit', ['news_category'=>$news_category]);
    }

    public function update(Request $request, $id)
    {
        $name = $request->input('name');
        $url_seo = stripVN($name);
        $description = $request->input('description');
        $meta_title = $request->input('meta_title');
        $meta_desc = $request->input('meta_desc');
        $meta_tag = $request->input('meta_tag');
        $image = $request->input('image');
        $data=array(
            'name'=>$name,
            'url_seo'=>$url_seo,
            "description"=>$description,
            "meta_title"=>$meta_title,
            "meta_desc"=>$meta_desc,
            "meta_tag"=>$meta_tag,
            "image"=>$image
        );
        DB::table('news_categories')->where('id',$id)->update($data);
        DB::table('url_seo_list')->updateOrInsert(['url_seo'=>$url_seo],["url_type"=>3, "relation_id"=>$id]);
        return redirect('/list_news_category');
    }
}