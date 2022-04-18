@extends('layouts.default')
@section('content')
<div class="container-xxl flex-grow-1 container-p-y">
  <h4 class="fw-bold py-3 mb-4"><span class="text-muted">Danh sách menu/</span> Sửa menu</h4>

  <!-- Basic Layout & Basic with Icons -->
  <div class="row">
    <!-- Basic Layout -->
    <div class="col-xxl">
      <div class="card mb-4">
        <div class="card-body">
          <!-- Pills -->
          <div class="row">
            <div class="col-xl-12">
              <form action="/update_menu/{{ $menu->id }}" method="post" action="/action_page.php">
                <input type="hidden" name="_token" value="<?php echo csrf_token(); ?>"><input
                  type="hidden" name="_token" value="<?php echo csrf_token(); ?>">
                <div class="row mb-3">
                  <label class="col-sm-2 col-form-label" for="name">Tên menu</label>
                  <div class="col-sm-10">
                    <input type="text" class="form-control" id="name" name="name" placeholder="" value="{{ $menu->name }}"/>
                  </div>
                </div>
                <div class="row mb-3">
                  <label class="col-sm-2 col-form-label" for="type_id">Loại menu</label>
                  <div class="col-sm-10">
                    <select name="type_id" id="type_id" class="form-control" onchange="return showMenuType();">
                      <option value="0">--- Chọn loại menu ---</option>                      
                      @foreach ($menu_types as $item)
                      <option value="{{ $item->id }}" @if ($item->id==$menu->type)
                        selected="selected"
                        @endif>
                        {{ $item->name }}
                      </option>
                      @endforeach
                  </select>
                  </div>
                </div>

                <div class="row mb-3 div_relation" id="div_relation1">
                  <label class="col-sm-2 col-form-label" for="category_id">Danh mục sản phẩm</label>
                  <div class="col-sm-10">
                    <select name="category_id" id="category_id" class="form-control" >
                      <option value="0">--- Chọn danh mục sản phẩm ---</option>                      
                      @foreach ($categories as $item)
                      <option value="{{ $item['id'] }}" @if ($item['id']==$menu->relation_id)
                        selected="selected"
                        @endif>
                        {{ $item['name'] }}
                      </option>
                      @endforeach
                  </select>
                  </div>
                </div>

                <div class="row mb-3 div_relation" id="div_relation2">
                  <label class="col-sm-2 col-form-label" for="product_id">Sản phẩm</label>
                  <div class="col-sm-10">
                    <select name="product_id" id="product_id" class="form-control" >
                      <option value="0">--- Chọn sản phẩm ---</option>                      
                      @foreach ($products as $item)
                      <option value="{{ $item->id }}" @if ($item->id==$menu->relation_id)
                        selected="selected"
                        @endif>
                        {{ $item->name }}
                      </option>
                      @endforeach
                  </select>
                  </div>
                </div>

                <div class="row mb-3 div_relation" id="div_relation3">
                  <label class="col-sm-2 col-form-label" for="news_category_id">Danh mục tin tức</label>
                  <div class="col-sm-10">
                    <select name="news_category_id" id="news_category_id" class="form-control" >
                      <option value="0">--- Chọn danh mục tin tức ---</option>                      
                      @foreach ($news_categories as $item)
                      <option value="{{ $item->id }}" @if ($item->id==$menu->relation_id)
                        selected="selected"
                        @endif>
                        {{ $item->name }}
                      </option>
                      @endforeach
                  </select>
                  </div>
                </div>

                <div class="row mb-3 div_relation" id="div_relation4">
                  <label class="col-sm-2 col-form-label" for="news_id">Tin tức</label>
                  <div class="col-sm-10">
                    <select name="news_id" id="news_id" class="form-control" >
                      <option value="0">--- Chọn tin tức ---</option>                      
                      @foreach ($news as $item)
                      <option value="{{ $item->id }}" @if ($item->id==$menu->relation_id)
                        selected="selected"
                        @endif>
                        {{ $item->title }}
                      </option>
                      @endforeach
                  </select>
                  </div>
                </div>

                <div class="row mb-3 div_relation" id="div_relation5">
                  <label class="col-sm-2 col-form-label" for="static_page_id">Trang tĩnh</label>
                  <div class="col-sm-10">
                    <select name="static_page_id" id="static_page_id" class="form-control" >
                      <option value="0">--- Chọn trang tĩnh ---</option>                      
                      @foreach ($static_pages as $item)
                      <option value="{{ $item->id }}" @if ($item->id==$menu->relation_id)
                        selected="selected"
                        @endif>
                        {{ $item->name }}
                      </option>
                      @endforeach
                  </select>
                  </div>
                </div>

                <div class="row mb-3 div_relation" id="div_relation6">
                  <label class="col-sm-2 col-form-label" for="parent_id">Trang thông tin</label>
                  <div class="col-sm-10">
                    <select name="parent_id" id="parent_id" class="form-control" >
                      <option value="0">--- Chọn trang thông tin ---</option>                      
                      @foreach ($menus as $item)
                      <option value="{{ $item['id'] }}" @if ($item['id']==$menu->parent_id)
                        selected="selected"
                        @endif>
                        {{ $item['name'] }}
                      </option>
                      @endforeach
                  </select>
                  </div>
                </div>

                <div class="row mb-3">
                  <label class="col-sm-2 col-form-label" for="parent_id">Menu cha</label>
                  <div class="col-sm-10">
                    <select name="parent_id" id="parent_id" class="form-control" >
                      <option value="0">--- Chọn menu cha ---</option>                      
                      @foreach ($menus as $item)
                      <option value="{{ $item['id'] }}" @if ($item['id']==$menu->parent_id)
                        selected="selected"
                        @endif>
                        {{ $item['name'] }}
                      </option>
                      @endforeach
                  </select>
                  </div>
                </div>
                

                <div class="row justify-content-end">
                  <div class="col-sm-10">
                    <button type="submit" class="btn btn-primary">Lưu</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <!-- Pills -->

        </div>
      </div>
    </div>
  </div>
</div>
<script>
  function showMenuType(){
    var selectBox = document.getElementById('type_id');
    var userInput = selectBox.options[selectBox.selectedIndex].value;
    $('.div_relation').css('display', 'none');
    $('#div_relation' + userInput).css('display', 'flex');
  }
  $( document ).ready(function() {
    var selectBox = document.getElementById('type_id');
    var userInput = selectBox.options[selectBox.selectedIndex].value;
    $('#div_relation' + userInput).css('display', 'flex');
  });
</script>
@stop