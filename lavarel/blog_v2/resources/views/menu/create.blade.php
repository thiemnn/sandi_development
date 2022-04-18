@extends('layouts.default')
@section('content')
<div class="container-xxl flex-grow-1 container-p-y">
  <h4 class="fw-bold py-3 mb-4"><span class="text-muted">Danh sách menu/</span> Thêm menu </h4>

  <!-- Basic Layout & Basic with Icons -->
  <div class="row">
    <!-- Basic Layout -->
    <div class="col-xxl">
      <div class="card mb-4">
        <div class="card-body">
          <!-- Pills -->
          <div class="row">
            <div class="col-xl-12">
              <form action="/create_menu" method="post" action="/action_page.php">
                <input type="hidden" name="_token" value="<?php echo csrf_token(); ?>"><input
                  type="hidden" name="_token" value="<?php echo csrf_token(); ?>">
                <div class="row mb-3">
                  <label class="col-sm-2 col-form-label" for="name">Tên menu</label>
                  <div class="col-sm-10">
                    <input type="text" class="form-control" id="name" name="name" placeholder="" />
                  </div>
                </div>                
                <div class="row mb-3">
                  <label class="col-sm-2 col-form-label" for="parent_id">Danh mục cha</label>
                  <div class="col-sm-10">
                    
                    <select name="parent_id" id="parent_id" class="form-control" >
                      <option value="0">--- Chọn danh mục cha ---</option>                      
                      @foreach ($menus as $menu)
                          <option value="{{ $menu['id'] }}">{{ $menu['name'] }}</option>
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
@stop