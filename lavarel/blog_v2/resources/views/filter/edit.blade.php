@extends('layouts.default')
@section('content')
<div class="container-xxl flex-grow-1 container-p-y">
  <h4 class="fw-bold py-3 mb-4"><span class="text-muted">Danh sách tùy chọn lọc/</span> Sửa tùy chọn lọc </h4>

  <div class="flash-message">
    @foreach (['danger', 'warning', 'success', 'info'] as $msg)
      @if(Session::has('alert-' . $msg))

      <p class="alert alert-{{ $msg }}">{{ Session::get('alert-' . $msg) }}</p>
      @endif
    @endforeach
  </div> <!-- end .flash-message -->
  <!-- Basic Layout & Basic with Icons -->
  <div class="row">
    <!-- Basic Layout -->
    <div class="col-xxl">
      <div class="card mb-4">
        <div class="card-body">
          <!-- Pills -->
          <div class="row">
            <div class="col-xl-12">
              <form action="/update_filter/{{ $filter->id }}" method="post" action="/action_page.php">
                <input type="hidden" name="_token" value="<?php echo csrf_token(); ?>"><input
                  type="hidden" name="_token" value="<?php echo csrf_token(); ?>">
                
                  <div class="row">
                  <div class="col-xl-6">
                    <div class="row mb-3">
                      <label class="col-sm-4 col-form-label" for="name">Tên tùy chọn lọc</label>
                      <div class="col-sm-8">
                        <input type="text" class="form-control" id="name" name="name" value="{{ $filter->name }}" placeholder="" />
                      </div>
                    </div>
                    <div class="row mb-3">
                      <label class="col-sm-4 col-form-label" for="order_display">Sắp xếp</label>
                      <div class="col-sm-8">
                        <input type="text" class="form-control" id="order_display" name="order_display" value="{{ $filter->order_display }}" placeholder="" />
                      </div>
                    </div>
                    <div class="row mb-3">
                      <table id="option-value" class="table table-striped table-bordered table-hover">
                        <thead>
                          <tr>
                            <td class="text-left required">Thuộc tính lọc</td>
                            <td class="text-right">Thao tác</td>
                          </tr>
                        </thead>
                        <tbody>
                          @php
                          $last_index = 1
                          @endphp
                          @foreach ($filter_options as $filter_option)                            
                          <tr id="option-value-row{{ $filter_option->order_display }}">
                            <td class="text-left"><input type="hidden" name="option_value_ids[]" value="">
                              <div class="input-group"> <input type="text" name="option_value_names[]" value="{{ $filter_option->name }}" placeholder="Thuộc tính lọc"
                                  class="form-control"> </div>
                            </td>
                            <td class="text-left"><button type="button" onclick="$('#option-value-row{{ $filter_option->order_display }}').remove();" data-toggle="tooltip"
                                title="Xóa" class="btn btn-danger"><i class="fa fa-minus-circle"></i></button></td>
                          </tr>
                          @php
                          $last_index = $filter_option->order_display + 1
                          @endphp
                          @endforeach
                          <input id="last_index" type="hidden" value="{{$last_index}}"/>
                        </tbody>
                        <tfoot>
                          <tr>
                            <td colspan="1"></td>
                            <td class="text-left"><button type="button" onclick="addOptionValue();" data-toggle="tooltip" title=""
                                class="btn btn-primary" data-original-title="Thêm giá trị tùy chọn"><i
                                  class="fa fa-plus-circle"></i></button></td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </div>
                  <div class="col-xl-6">
                    <div><label class="col-sm-2 col-form-label" for="name">Chọn danh mục</label></div>
                    <div class="div_select_categories">
                      @foreach ($categories as $item)                            
                      <div class="even">
                        <input type="checkbox" name="product_categories[]" value="{{ $item['id'] }}" {{ existCategory($filter_categories, $item['id']) ? 'checked' : '' }}>
                        {{ $item['name'] }}<br>
                      </div>
                      @endforeach
                    </div>
                  </div>
                  </div>
                  

                <div class="row justify-content-end">
                  <div class="col-sm-12 mt-30 center">
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
<script src="https://cdn.tiny.cloud/1/e8f9z2k2n997m14yd0yhcwdzixvzcoxp4pmvpb2xcb1xdfoj/tinymce/5/tinymce.min.js"
  referrerpolicy="origin"></script>
<script>
  var option_value_row = 1;
  $(document).ready(function() {
    option_value_row = $('#last_index').val();
  });
  function addOptionValue() {
        html = '<tr id="option-value-row' + option_value_row + '">';
          html += ' <td class="text-left"><input type="hidden" name="option_value_ids[]" value="" />';
            html += ' <div class="input-group">';
              html += ' <input type="text" name="option_value_names[]" value="" placeholder="Thuộc tính lọc" class="form-control" />';
              html += ' </div>';
            html += ' </td>';
          html += ' <td class="text-left"><button type="button"  onclick="$(\'#option-value-row' + option_value_row + '\').remove();" data-toggle="tooltip" title="Xóa"  class="btn btn-danger"><i class="fa fa-minus-circle"></i></button></td>';
          html += '</tr>';
        $('#option-value tbody').append(html);        
        option_value_row++;
        }
</script>
@stop