<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;
use App\Http\Requests;
use App\Http\Controllers\Controller;

class ProductController extends Controller
{
    //
    public function insertform(){
        return view('product/create');
    }
    public function insert(Request $request){
        $name = $request->input('name');
        $url_seo = stripVN($name);
        $short_description = $request->input('short_description');
        $meta_title = $request->input('meta_title');
        $meta_desc = $request->input('meta_desc');
        $meta_tag = $request->input('meta_tag');
        $long_description = $request->input('long_description');
        $data=array(
            'name'=>$name,
            'url_seo'=>$url_seo,
            "short_description"=>$short_description,
            "meta_title"=>$meta_title,
            "meta_desc"=>$meta_desc,
            "meta_tag"=>$meta_tag,
            "long_description"=>$long_description
        );
        $id = DB::table('products')->insertGetId($data);
        DB::table('url_seo_list')->updateOrInsert(['url_seo'=>$url_seo],["url_type"=>2, "relation_id"=>$id]);
        $request->session()->flash('alert-success', 'Lưu thông tin thành công!');
        return redirect('/edit_product/'.$id);
    }
    public function list()
    {
        $products = DB::select('select * from products');
        return view('product/list',['products'=>$products]);
    }
    public function editform($id)
    {
        $items = DB::select('select id, parent_id, name, image from categories');
        $categories = getAllCategories($items);
        $product_categories = DB::table('product_category')->where('product_id',$id)->select('category_id')->get()->toArray();   
        $product_images = DB::table('product_image')->where('product_id',$id)->select('image_url')->get()->toArray();      
        $product = DB::select('select * from products where id = ' . $id)[0];
        $filters = DB::select('select A.name as filter_name from filters A');
        $filter_options = DB::select('select A.name as filter_name, B.id as option_id, B.name as option_name from filters A LEFT JOIN filter_options B on A.id = B.filter_id');
        $selected_filter_options = DB::select('select * from product_filter_options where product_id = ' . $id);

        return view('product/edit', 
        ['product'=>$product, 
        'categories'=>$categories, 
        'product_categories'=>$product_categories, 
        'product_images'=>$product_images, 
        'filters'=>$filters, 
        'filter_options'=>$filter_options, 
        'selected_filter_options'=>$selected_filter_options
        ]);
    }

    public function update_overview(Request $request, $id)
    {
        $name = $request->input('name');
        $url_seo = stripVN($name);
        $short_description = $request->input('short_description');
        $meta_title = $request->input('meta_title');
        $meta_desc = $request->input('meta_desc');
        $meta_tag = $request->input('meta_tag');
        $long_description = $request->input('long_description');
        $data=array(
            'name'=>$name,
            'url_seo'=>$url_seo,
            "short_description"=>$short_description,
            "meta_title"=>$meta_title,
            "meta_desc"=>$meta_desc,
            "meta_tag"=>$meta_tag,
            "long_description"=>$long_description);
        DB::table('products')->where('id',$id)->update($data);
        DB::table('url_seo_list')->updateOrInsert(['url_seo'=>$url_seo],["url_type"=>2, "relation_id"=>$id]);
        $request->session()->flash('alert-success', 'Lưu thông tin thành công!');
        return redirect('/edit_product/'.$id);
    }
    public function update_data(Request $request, $id)
    {
        $image = $request->input('image');
        $price = $request->input('price');
        $code = $request->input('code');
        $quantity = $request->input('quantity');
        $min_quantity = $request->input('min_quantity');
        $sku = $request->input('sku');
        $order_display = $request->input('order_display');
        $tax = $request->input('tax');
        $store_address = $request->input('store_address');
        $store_status = $request->input('store_status');
        $weight_unit = $request->input('weight_unit');
        $weight = $request->input('weight');
        $size_unit = $request->input('size_unit');
        $size_long = $request->input('size_long');
        $size_width = $request->input('size_width');
        $size_high = $request->input('size_high');
        $solid_work_code = $request->input('solid_work_code');

        $data=array(
            "image"=>$image,
            "price"=>$price,
            "code"=>$code,
            "quantity"=>$quantity,
            "min_quantity"=>$min_quantity,
            "sku"=>$sku,
            'order_display'=>$order_display,
            "tax"=>$tax,
            "store_address"=>$store_address,
            "store_status"=>$store_status,
            "weight_unit"=>$weight_unit,
            "weight"=>$weight,
            "size_unit"=>$size_unit,
            "size_long"=>$size_long,
            "size_width"=>$size_width,
            "size_high"=>$size_high,
            "solid_work_code"=>$solid_work_code
        );
        DB::table('products')->where('id',$id)->update($data);
        $request->session()->flash('alert-success', 'Lưu thông tin thành công!');
        return redirect('/edit_product/'.$id);
    }

    public function update_link(Request $request, $id)
    {
        $provider = $request->input('provider');
        $product_categories = $request->input('product_categories');
        DB::table('product_category')->where('product_id',$id)->delete();
        foreach($product_categories as $category){
            $data=array('product_id'=>$id,"category_id"=>$category);
            DB::table('product_category')->insert($data);
        }
        $data=array(
            "provider"=>$provider
        );
        DB::table('products')->where('id',$id)->update($data);
        $request->session()->flash('alert-success', 'Lưu thông tin thành công!');
        return redirect('/edit_product/'.$id);
    }

    public function update_images(Request $request, $id)
    {
        $provider = $request->input('provider');
        $images = $request->input('images');
        DB::table('product_image')->where('product_id',$id)->delete();
        foreach($images as $image){
            if($image != null){
                $data=array('product_id'=>$id,"image_url"=>$image);
                DB::table('product_image')->insert($data);
            }
        }
        $request->session()->flash('alert-success', 'Lưu thông tin thành công!');
        return redirect('/edit_product/'.$id);
    }

    public function update_characteristic(Request $request, $id)
    {
        $characteristic = $request->input('characteristic');
        $application = $request->input('application');
        $user_manual = $request->input('user_manual');
        $data=array(
            "characteristic"=>$characteristic,
            "application"=>$application,
            "user_manual"=>$user_manual);
        DB::table('products')->where('id',$id)->update($data);
        $request->session()->flash('alert-success', 'Lưu thông tin thành công!');
        return redirect('/edit_product/'.$id);
    }

    public function update_filter_option(Request $request, $id)
    {
        $filter_options = $request->input('filter_options');
        DB::table('product_filter_options')->where('product_id',$id)->delete();
        foreach($filter_options as $filter_option){
            $data=array('product_id'=>$id,"filter_option_id"=>$filter_option);
            DB::table('product_filter_options')->insert($data);
        }
        $request->session()->flash('alert-success', 'Lưu thông tin thành công!');
        return redirect('/edit_product/'.$id);
    }
}