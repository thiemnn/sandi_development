@extends('layouts.default')
@section('content')
   <!-- Content -->  
   <div class="container-xxl flex-grow-1 container-p-y">
    <div class="row">
      <div class="col-xl-10">
        <h4 class="fw-bold py-3 mb-4"><span class="text-muted">Quản lý sản phẩm /</span> Danh sách sản phẩm</h4>
      </div>
      <div class="col-xl-2" style="text-align: right;  padding-top: 1rem !important;  padding-bottom: 1rem !important;">
        <button type="submit" class="btn btn-primary" onclick="window.location='{{ url('/insert_product') }}'" style="width:100px">Thêm</button>
      </div>
    </div> 
    <!-- Bordered Table -->
    <div class="card">
      <div class="card-body">
        <div class="table-responsive text-nowrap">
          <table class="table table-bordered">
            <thead>
              <tr>
                {{-- <th>Hình ảnh</th> --}}
                <th>Tên sản phẩm</th>
                <th style="width:100px">Trạng thái</th>
                <th style="width:100px">Hành động</th>
              </tr>
            </thead>
            <tbody>
              @foreach ($products as $product)
              <tr>
                {{-- <td>
                  <img src="https://sandivietnam.com/image/cache/catalog/con%20lan/con-lan-nham-ma-kem-201-3-50x50.jpg"
                    class="img-thumbnail" alt="...">
                </td> --}}
                <td>
                  <i class="fab fa-angular fa-lg text-danger me-3"></i> <strong>{{ $product->name }}</strong>
                </td>
                <td><span class="badge bg-label-primary me-1">Bật</span></td>
                <td>
                  <a class="dropdown-item" href="/edit_product/{{ $product->id }}"><i class="bx bx-edit-alt me-1"></i>
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