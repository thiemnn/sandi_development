<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;
use App\Http\Requests;
use App\Http\Controllers\Controller;

class FilterController extends Controller
{    
    public function insertform(){
        $items = DB::select('select id, parent_id, name, image from categories');
        $categories = getAllCategories($items);  
        return view('filter/create', ['categories' => $categories]);
    }
    public function insert(Request $request){
        $name = $request->input('name');
        $order_display = $request->input('order_display');
        $option_value_names = $request->input('option_value_names');
        $product_categories = $request->input('product_categories');

        
        $data=array(
            'name'=>$name,
            'order_display'=>$order_display
        );
        $id = DB::table('filters')->insertGetId($data);

        $order_display = 1;
        foreach($option_value_names as $option_value_name){
            $data=array('filter_id'=>$id,"name"=>$option_value_name,"order_display"=>$order_display);
            DB::table('filter_options')->insert($data);
            $order_display+=1;
        }

        foreach($product_categories as $category){
            $data=array('filter_id'=>$id,"category_id"=>$category);
            DB::table('filters_categories')->insert($data);
        }

        $request->session()->flash('alert-success', 'Lưu thông tin thành công!');
        return redirect('/edit_filter/'.$id);
    }
    public function list()
    {
        $filters = DB::select('select * from filters');
        return view('filter/list',['filters'=>$filters]);
    }
    public function editform($id)
    {        
        $items = DB::select('select id, parent_id, name, image from categories');
        $categories = getAllCategories($items);  
        $filter = DB::select('select * from filters where id = ' . $id)[0];
        $filter_categories = DB::table('filters_categories')->where('filter_id',$id)->select('category_id')->get()->toArray();
        $filter_options = DB::table('filter_options')->where('filter_id',$id)->select('name','order_display')->get()->toArray();
        return view('filter/edit', ['filter'=>$filter, 'categories'=>$categories, 'filter_categories'=>$filter_categories, 'filter_options'=>$filter_options]);
    }

    public function update(Request $request, $id)
    {
        $name = $request->input('name');
        $order_display = $request->input('order_display');
        $option_value_names = $request->input('option_value_names');
        $product_categories = $request->input('product_categories');

        DB::table('filters_categories')->where('filter_id',$id)->delete();
        foreach($product_categories as $category){
            $data=array('filter_id'=>$id,"category_id"=>$category);
            DB::table('filters_categories')->insert($data);
        }

        DB::table('filter_options')->where('filter_id',$id)->delete();
        $order_display = 1;
        foreach($option_value_names as $option_value_name){
            $data=array('filter_id'=>$id,"name"=>$option_value_name,"order_display"=>$order_display);
            DB::table('filter_options')->insert($data);
            $order_display+=1;
        }

        $data=array(
            'name'=>$name,
            'order_display'=>$order_display
        );
        DB::table('filters')->where('id',$id)->update($data);

        $request->session()->flash('alert-success', 'Lưu thông tin thành công!');
        return redirect('/edit_filter/'.$id);
    }
}