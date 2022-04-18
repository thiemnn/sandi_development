<?php
if (! function_exists('recursiveAddItem')) {
    function recursiveAddItem($parentName, $childs, &$categories) {
        foreach($childs as $child){
            $new_name = $parentName .' -> '. $child->name;
            $categories[] = array('id' => $child->id ,'name' => "$new_name", 'image' => "$child->image");
            if(isset($child->childs)){
                recursiveAddItem($parentName .' -> '. $child->name, $child->childs, $categories);
            }
        }
    }
}

if (! function_exists('getAllCategories')) {
    function getAllCategories($items) {
        $childs = array();
        foreach($items as $item)
            $childs[$item->parent_id][] = $item;
        foreach($items as $item) if (isset($childs[$item->id]))
            $item->childs = $childs[$item->id];

        $categories = array();
        if (!empty($childs)) {
            $tree = $childs[0];        
            foreach($tree as $item){
                $categories[] = array('id' => $item->id ,'name' => "$item->name", 'image' => "$item->image");
                if(isset($item->childs)){
                    recursiveAddItem($item->name, $item->childs, $categories);
                } 
            }
        }    
        return $categories;
    }
}

if (! function_exists('recursiveAddItemMenu')) {
    function recursiveAddItemMenu($parentName, $childs, &$menus) {
        foreach($childs as $child){
            $new_name = $parentName .' -> '. $child->name;
            $menus[] = array('id' => $child->id ,'name' => "$new_name");
            if(isset($child->childs)){
                recursiveAddItemMenu($parentName .' -> '. $child->name, $child->childs, $menus);
            }
        }
    }
}

if (! function_exists('getAllMenus')) {
    function getAllMenus($items) {
        $childs = array();
        foreach($items as $item)
            $childs[$item->parent_id][] = $item;
        foreach($items as $item) if (isset($childs[$item->id]))
            $item->childs = $childs[$item->id];

        $menus = array();
        if (!empty($childs)) {
            $tree = $childs[0];        
            foreach($tree as $item){
                $menus[] = array('id' => $item->id ,'name' => "$item->name");
                if(isset($item->childs)){
                    recursiveAddItemMenu($item->name, $item->childs, $menus);
                } 
            }
        }    
        return $menus;
    }
}

if (! function_exists('existCategory')) {
    function existCategory($product_categories, $category_id) {
        $exist = false;
        foreach($product_categories as $product_category){
            if($product_category->category_id == $category_id)
            {
                $exist = true;
            }
        }        
        return $exist;
    }
}

if (! function_exists('existFilterOption')) {
    function existFilterOption($selected_filter_options, $filter_option_id) {
        $exist = false;
        foreach($selected_filter_options as $selected_filter_option){
            if($selected_filter_option->filter_option_id == $filter_option_id)
            {
                $exist = true;
            }
        }        
        return $exist;
    }
}

if (! function_exists('existNewsCategory')) {
    function existNewsCategory($news_categories, $category_id) {
        $exist = false;
        foreach($news_categories as $news_category){
            if($news_category->category_id == $category_id)
            {
                $exist = true;
            }
        }        
        return $exist;
    }
}

if (! function_exists('stripVN')) {
    function stripVN($str) {
        $str = mb_strtolower($str);
        $str = preg_replace("/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/", 'a', $str);
        $str = preg_replace("/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/", 'e', $str);
        $str = preg_replace("/(ì|í|ị|ỉ|ĩ)/", 'i', $str);
        $str = preg_replace("/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/", 'o', $str);
        $str = preg_replace("/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/", 'u', $str);
        $str = preg_replace("/(ỳ|ý|ỵ|ỷ|ỹ)/", 'y', $str);
        $str = preg_replace("/(đ)/", 'd', $str);
        $str = preg_replace("/( |   )/", '_', $str);
    return $str;
    }
}