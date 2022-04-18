<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;
use App\Http\Requests;
use App\Http\Controllers\Controller;

class NewsController extends Controller
{    
    public function insertform(){
        $news_categories = DB::select('select * from news_categories');
        return view('news/create', ['news_categories' => $news_categories]);
    }
    public function insert(Request $request){
        $title = $request->input('title');
        $url_seo = stripVN($title);
        $short_description = $request->input('short_description');
        $meta_title = $request->input('meta_title');
        $meta_desc = $request->input('meta_desc');
        $meta_tag = $request->input('meta_tag');
        $content = $request->input('content');
        $data=array(
            'title'=>$title,
            'url_seo'=>$url_seo,
            "short_description"=>$short_description,
            "meta_title"=>$meta_title,
            "meta_desc"=>$meta_desc,
            "meta_tag"=>$meta_tag,
            "content"=>$content
        );
        $id = DB::table('news')->insertGetId($data);
        DB::table('url_seo_list')->updateOrInsert(['url_seo'=>$url_seo],["url_type"=>4, "relation_id"=>$id]);
        $request->session()->flash('alert-success', 'Lưu thông tin thành công!');
        return redirect('/edit_news/'.$id);
    }
    public function list()
    {
        $news = DB::select('select * from news');
        return view('news/list',['news'=>$news]);
    }
    public function editform($id)
    {        
        $news_categories = DB::select('select * from news_categories');
        $assigned_categories = DB::table('news_category')->where('news_id',$id)->select('category_id')->get()->toArray();     
        $news = DB::select('select * from news where id = ' . $id)[0];
        return view('news/edit', ['news'=>$news, 'news_categories'=>$news_categories, 'assigned_categories'=>$assigned_categories]);
    }

    public function update_overview(Request $request, $id)
    {
        $title = $request->input('title');
        $url_seo = stripVN($title);
        $short_description = $request->input('short_description');
        $meta_title = $request->input('meta_title');
        $meta_desc = $request->input('meta_desc');
        $meta_tag = $request->input('meta_tag');
        $content = $request->input('content');
        $data=array(
            'title'=>$title,
            'url_seo'=>$url_seo,
            "short_description"=>$short_description,
            "meta_title"=>$meta_title,
            "meta_desc"=>$meta_desc,
            "meta_tag"=>$meta_tag,
            "content"=>$content);
        DB::table('news')->where('id',$id)->update($data);
        DB::table('url_seo_list')->updateOrInsert(['url_seo'=>$url_seo],["url_type"=>4, "relation_id"=>$id]);
        $request->session()->flash('alert-success', 'Lưu thông tin thành công!');
        return redirect('/edit_news/'.$id);
    }

    public function update_link(Request $request, $id)
    {
        $image = $request->input('image');
        $news_categories = $request->input('news_categories');
        DB::table('news_category')->where('news_id',$id)->delete();
        foreach($news_categories as $category){
            $data=array('news_id'=>$id,"category_id"=>$category);
            DB::table('news_category')->insert($data);
        }
        $data=array(
            "image"=>$image
        );
        DB::table('news')->where('id',$id)->update($data);
        $request->session()->flash('alert-success', 'Lưu thông tin thành công!');
        return redirect('/edit_news/'.$id);
    }
}