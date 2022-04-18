@extends('layouts.default')
@section('content')
   <!-- Content -->  
   <div class="container-xxl flex-grow-1 container-p-y">
    <div class="row">
      <div class="col-xl-10">
        <h4 class="fw-bold py-3 mb-4"><span class="text-muted">Quản lý tin tức /</span> Danh mục tin tức</h4>
      </div>
      <div class="col-xl-2" style="text-align: right;  padding-top: 1rem !important;  padding-bottom: 1rem !important;">
        <button type="submit" onclick="window.location='{{ url('/insert_news_category') }}'" class="btn btn-primary" style="width:100px">Thêm</button>
      </div>
    </div> 
    <!-- Bordered Table -->
    <div class="card">
      <div class="card-body">
        <div class="table-responsive text-nowrap">
          <table class="table table-bordered">
            <thead>
              <tr>
                {{-- <th style="width:150px">Hình ảnh</th> --}}
                <th >Tên danh mục</th>
                <th style="width:100px">Trạng thái</th>
                <th style="width:100px">Hành động</th>
              </tr>
            </thead>
            <tbody>
              @foreach ($news_categories as $news_category)
              <tr>
                {{-- <td>
                  <img src="{{empty($category['image']) ? "
                  https://sandivietnam.com/image/cache/no_image-100x100.png" : $category['image']}}"
                    class="img-thumbnail" alt="...">
                </td> --}}
                <td>
                  <i class="fab fa-angular fa-lg me-3"></i> {{ $news_category->name }}
                </td>
                <td><span class="badge bg-label-primary me-1">Bật</span></td>
                <td>
                  <a class="dropdown-item" href="/edit_news_category/{{ $news_category->id }}"><i class="bx bx-edit-alt me-1"></i>
                    Sửa</a>
                </td>
              </tr>
              @endforeach
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <!--/ Bordered Table -->
  </div>
  <!-- / Content -->
@stop