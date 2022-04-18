@extends('layouts.default')
@section('content')
<div class="container-xxl flex-grow-1 container-p-y">
  <h4 class="fw-bold py-3 mb-4"><span class="text-muted">Danh sách sản phẩm/</span> Sửa thông tin sản
    phẩm</h4>

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
              <div class="nav-align-top mb-4">
                <ul class="nav nav-pills mb-3" role="tablist">
                  <li class="nav-item">
                    <button type="button" class="nav-link active" role="tab" data-bs-toggle="tab"
                      data-bs-target="#tab1" aria-controls="tab1" aria-selected="true">
                      Tổng quan
                    </button>
                  </li>
                  <li class="nav-item">
                    <button type="button" class="nav-link" role="tab" data-bs-toggle="tab"
                      data-bs-target="#tab2" aria-controls="tab2" aria-selected="false">
                      Dữ liệu
                    </button>
                  </li>
                  <li class="nav-item">
                    <button type="button" class="nav-link" role="tab" data-bs-toggle="tab"
                      data-bs-target="#tab3" aria-controls="tab3" aria-selected="false">
                      Liên kết
                    </button>
                  </li>
                  <li class="nav-item">
                    <button type="button" class="nav-link" role="tab" data-bs-toggle="tab"
                      data-bs-target="#tab4" aria-controls="tab4" aria-selected="false">
                      Hình ảnh
                    </button>
                  </li>
                  <li class="nav-item">
                    <button type="button" class="nav-link" role="tab" data-bs-toggle="tab"
                      data-bs-target="#tab5" aria-controls="tab5" aria-selected="false">
                      Đặc tính/ứng dụng
                    </button>
                  </li>
                  <li class="nav-item">
                    <button type="button" class="nav-link" role="tab" data-bs-toggle="tab"
                      data-bs-target="#tab6" aria-controls="tab6" aria-selected="false">
                      Tùy chọn lọc
                    </button>
                  </li>
                </ul>
                <div class="tab-content">
                  <div class="tab-pane fade show active" id="tab1" role="tabpanel">
                    <form action="/update_product_overview/{{ $product->id }}" method="post"
                      action="/action_page.php">
                      <input type="hidden" name="_token" value="<?php echo csrf_token(); ?>"><input
                        type="hidden" name="_token" value="<?php echo csrf_token(); ?>">
                      <div class="row mb-3">
                        <label class="col-sm-2 col-form-label" for="name">Tên sản phẩm</label>
                        <div class="col-sm-10">
                          <input type="text" class="form-control" id="name" value="{{ $product->name }}"
                            name="name" placeholder="" />
                        </div>
                      </div>
                      <div class="row mb-3">
                        <label class="col-sm-2 col-form-label" for="short_description">Mô tả ngắn</label>
                        <div class="col-sm-10">
                          <textarea id="short_description" name="short_description"
                            value="{{ $product->short_description }}"></textarea>
                          <input type="hidden" id="short_description_hidden" name="short_description_hidden"
                            value="{{ $product->short_description }}">
                        </div>
                      </div>
                      <div class="row mb-3">
                        <label class="col-sm-2 col-form-label" for="meta_title">Thẻ tiêu đề (Meta
                          title)</label>
                        <div class="col-sm-10">
                          <input type="text" class="form-control" id="meta_title" name="meta_title"
                            value="{{ $product->meta_title }}" placeholder="" />
                        </div>
                      </div>
                      <div class="row mb-3">
                        <label class="col-sm-2 col-form-label" for="meta_desc">Thẻ mô tả (Meta desc)</label>
                        <div class="col-sm-10">
                          <input type="text" class="form-control" id="meta_desc" name="meta_desc"
                            value="{{ $product->meta_desc }}" placeholder="" />
                        </div>
                      </div>
                      <div class="row mb-3">
                        <label class="col-sm-2 col-form-label" for="meta_tag">Từ khóa (tags)</label>
                        <div class="col-sm-10">
                          <input type="text" class="form-control" id="meta_tag" name="meta_tag"
                            value="{{ $product->meta_tag }}" placeholder="" />
                        </div>
                      </div>

                      <div class="row mb-3">
                        <label class="col-sm-2 col-form-label" for="long_description">Mô tả</label>
                        <div class="col-sm-10">
                          <textarea id="long_description" name="long_description"></textarea>
                          <input type="hidden" id="long_description_hidden" name="long_description_hidden"
                            value="{{ $product->long_description }}">
                        </div>
                      </div>


                      <div class="row justify-content-end">
                        <div class="col-sm-10">
                          <button type="submit" class="btn btn-primary">Lưu</button>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div class="tab-pane fade" id="tab2" role="tabpanel">
                    <form action="/update_product_data/{{ $product->id }}" method="post"
                      action="/action_page.php">
                      <input type="hidden" name="_token" value="<?php echo csrf_token(); ?>"><input
                        type="hidden" name="_token" value="<?php echo csrf_token(); ?>">
                      <div class="row mb-3">
                        <label class="col-sm-2 col-form-label" for="name">Ảnh đại diện</label>
                        <div class="col-sm-4">
                          <div class="div_image_container img-thumbnail">
                            <img class="image_select" id="img_image" name="img_image" src="{{empty($product->image) ? "
                              https://sandivietnam.com/image/cache/no_image-100x100.png" : $product->image}}"
                            alt="" title="">
                            <input type="hidden" id="img_image_hidden" name="image" value="{{ $product->image }}" />
                          </div>
                        </div>
                        
                      </div>
                      <div class="row mb-3">
                        <label class="col-sm-2 col-form-label" for="code">Mã sản phẩm</label>
                        <div class="col-sm-4">
                          <input type="text" class="form-control" id="code" value="{{ $product->code }}"
                            name="code" placeholder="" />
                        </div>
                        <label class="col-sm-2 col-form-label" for="price">Giá</label>
                        <div class="col-sm-4">
                          <input type="text" class="form-control" id="price" value="{{ $product->price }}"
                            name="price" placeholder="" />
                        </div>
                      </div>
                      <div class="row mb-3">
                        <label class="col-sm-2 col-form-label" for="quantity">Số lượng</label>
                        <div class="col-sm-4">
                          <input type="text" class="form-control" id="quantity" value="{{ $product->quantity }}"
                            name="quantity" placeholder="" />
                        </div>
                        <label class="col-sm-2 col-form-label" for="min_quantity">Số lượng tối
                          thiểu</label>
                        <div class="col-sm-4">
                          <input type="text" class="form-control" id="min_quantity"
                            value="{{ $product->min_quantity }}" name="min_quantity" placeholder="" />
                        </div>
                      </div>
                      <div class="row mb-3">
                        <label class="col-sm-2 col-form-label" for="sku">SKU</label>
                        <div class="col-sm-4">
                          <input type="text" class="form-control" id="sku" value="{{ $product->sku }}"
                            name="sku" placeholder="" />
                        </div>
                        <label class="col-sm-2 col-form-label" for="order_display">Sắp xếp</label>
                        <div class="col-sm-4">
                          <input type="text" class="form-control" id="order_display"
                            value="{{ $product->order_display }}" name="order_display" placeholder="" />
                        </div>
                      </div>
                      <div class="row mb-3">
                        <label class="col-sm-2 col-form-label" for="tax">Loại thuế</label>
                        <div class="col-sm-4">
                          <input type="text" class="form-control" id="tax" value="{{ $product->tax }}"
                            name="tax" placeholder="" />
                        </div>
                        <label class="col-sm-2 col-form-label" for="store_status">Trạng thái kho
                          hàng</label>
                        <div class="col-sm-4">
                          <input type="text" class="form-control" id="store_status"
                            value="{{ $product->store_status }}" name="store_status" placeholder="" />
                        </div>
                      </div>
                      <div class="row mb-3">
                        <label class="col-sm-2 col-form-label" for="store_address">Địa chỉ kho
                          hàng</label>
                        <div class="col-sm-10">
                          <input type="text" class="form-control" id="store_address"
                            value="{{ $product->store_address }}" name="store_address" placeholder="" />
                        </div>
                      </div>
                      <div class="row mb-3">
                        <label class="col-sm-2 col-form-label" for="weight_unit">Đơn vị trọng
                          lượng</label>
                        <div class="col-sm-4">
                          <input type="text" class="form-control" id="weight_unit"
                            value="{{ $product->weight_unit }}" name="weight_unit" placeholder="" />
                        </div>
                        <label class="col-sm-2 col-form-label" for="weight">Trọng lượng</label>
                        <div class="col-sm-4">
                          <input type="text" class="form-control" id="weight" value="{{ $product->weight }}"
                            name="weight" placeholder="" />
                        </div>
                      </div>
                      <div class="row mb-3">
                        <label class="col-sm-2 col-form-label" for="size_unit">Đơn vị kích
                          thước</label>
                        <div class="col-sm-4">
                          <input type="text" class="form-control" id="size_unit" value="{{ $product->size_unit }}"
                            name="size_unit" placeholder="" />
                        </div>
                      </div>
                      <div class="row mb-3">
                        <label class="col-sm-2 col-form-label" for="size_long">Kích thước(Dài x Rộng x
                          Cao)</label>
                        <div class="col-sm-2">
                          <input type="text" class="form-control" id="size_long" value="{{ $product->size_long }}"
                            name="size_long" placeholder="Dài" />
                        </div>
                        <div class="col-sm-2">
                          <input type="text" class="form-control" id="size_width" value="{{ $product->size_width }}"
                            name="size_width" placeholder="Rộng" />
                        </div>
                        <div class="col-sm-2">
                          <input type="text" class="form-control" id="size_high" value="{{ $product->size_high }}"
                            name="size_high" placeholder="Cao" />
                        </div>
                      </div>
                      <div class="row mb-3">
                        <label class="col-sm-2 col-form-label" for="size_unit">Mã nhúng solid work</label>
                        <div class="col-sm-10">
                          <textarea id="solid_work_code" rows="5" class="form-control input_solid_work"  name="solid_work_code"></textarea>
                          <input type="hidden" id="solid_work_code_hidden" name="solid_work_code_hidden"
                            value="{{ $product->solid_work_code }}">
                        </div>
                      </div>
                      <div class="row justify-content-end">
                        <div class="col-sm-10">
                          <button type="submit" class="btn btn-primary">Lưu</button>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div class="tab-pane fade" id="tab3" role="tabpanel">
                    <form action="/update_product_link/{{ $product->id }}" method="post"
                      action="/action_page.php">
                      <input type="hidden" name="_token" value="<?php echo csrf_token(); ?>"><input
                        type="hidden" name="_token" value="<?php echo csrf_token(); ?>">
                      
                      <div class="row mb-3">
                        <label class="col-sm-2 col-form-label" for="provider">Hãng sản xuất</label>
                        <div class="col-sm-10">
                          <input type="text" class="form-control" id="provider" name="provider" value="{{ $product->provider }}" placeholder="" />
                        </div>
                      </div>
                      <div class="row mb-3">
                        <label class="col-sm-2 col-form-label" for="">Danh mục</label>
                        <div class="col-sm-10">
                          <div class="div_select_categories">
                            @foreach ($categories as $item)                            
                            <div class="even">
                              <input type="checkbox" name="product_categories[]" value="{{ $item['id'] }}" {{ existCategory($product_categories, $item['id']) ? 'checked' : '' }}>
                              {{ $item['name'] }}<br>
                            </div>
                            @endforeach
                          </div>
                        </div>
                      </div>                   
                      <div class="row justify-content-end">
                        <div class="col-sm-10">
                          <button type="submit" class="btn btn-primary">Lưu</button>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div class="tab-pane fade" id="tab4" role="tabpanel">
                    <form action="/update_product_images/{{ $product->id }}" method="post"
                      action="/action_page.php">
                      <input type="hidden" name="_token" value="<?php echo csrf_token(); ?>"><input
                        type="hidden" name="_token" value="<?php echo csrf_token(); ?>">                      
                      <div class="row mb-3">
                        @php
                        $last_index = 0
                        @endphp
                        @foreach ($product_images as $item)    
                          <div class="dragdrop div_image_container img-thumbnail">
                            <img class="image_select" id="image_{{ $loop->index }}" src="{{ $item->image_url }}" width="100" height="100">
                            <input type="hidden" id="image_{{ $loop->index }}_hidden" name="images[]" value="{{ $item->image_url }}" />
                          </div>
                          @php
                          $last_index = $loop->index + 1
                          @endphp
                        @endforeach
                        @for ($i = $last_index; $i < 18; $i++)
                          <div class="dragdrop div_image_container img-thumbnail">
                            <img class="image_select" id="image_{{ $i }}" src="https://sandivietnam.com/image/cache/no_image-100x100.png" width="100" height="100">
                            <input type="hidden" id="image_{{ $i }}_hidden" name="images[]" />
                          </div>
                        @endfor
                      </div>      
                      <div class="row">
                        <div class="col-sm-10">
                          <button type="submit" class="btn btn-primary">Lưu</button>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div class="tab-pane fade" id="tab5" role="tabpanel">
                    <form action="/update_product_characteristic/{{ $product->id }}" method="post"
                      action="/action_page.php">
                      <input type="hidden" name="_token" value="<?php echo csrf_token(); ?>"><input
                        type="hidden" name="_token" value="<?php echo csrf_token(); ?>">                      

                      <div class="row mb-3">
                        <label class="col-sm-2 col-form-label" for="characteristic">Đặc tính</label>
                        <div class="col-sm-10">
                          <textarea id="characteristic" name="characteristic"></textarea>
                          <input type="hidden" id="characteristic_hidden" name="characteristic_hidden"
                            value="{{ $product->characteristic }}">
                        </div>
                      </div>

                      <div class="row mb-3">
                        <label class="col-sm-2 col-form-label" for="application">Ứng dụng</label>
                        <div class="col-sm-10">
                          <textarea id="application" name="application"></textarea>
                          <input type="hidden" id="application_hidden" name="application_hidden"
                            value="{{ $product->application }}">
                        </div>
                      </div>

                      <div class="row mb-3">
                        <label class="col-sm-2 col-form-label" for="user_manual">Hướng dẫn sử dụng</label>
                        <div class="col-sm-10">
                          <textarea id="user_manual" name="user_manual"></textarea>
                          <input type="hidden" id="user_manual_hidden" name="user_manual_hidden"
                            value="{{ $product->user_manual }}">
                        </div>
                      </div>


                      <div class="row justify-content-end">
                        <div class="col-sm-10">
                          <button type="submit" class="btn btn-primary">Lưu</button>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div class="tab-pane fade" id="tab6" role="tabpanel">
                    <form action="/update_product_filter_option/{{ $product->id }}" method="post"
                      action="/action_page.php">
                      <input type="hidden" name="_token" value="<?php echo csrf_token(); ?>"><input
                        type="hidden" name="_token" value="<?php echo csrf_token(); ?>">
                        
                      @foreach ($filters as $filter)    
                      <div class="row mb-3">
                        <label class="col-sm-2 col-form-label" for="provider">{{$filter->filter_name}}</label>
                        <div class="col-sm-10">
                          <div class="row">
                            @foreach ($filter_options as $filter_option)   
                            @if ($filter_option->filter_name == $filter->filter_name)
                            <div class="col-sm-4">
                              <input type="checkbox" id="check_{{$filter_option->option_id}}" value="{{ $filter_option->option_id }}" name="filter_options[]"
                              {{ existFilterOption($selected_filter_options, $filter_option->option_id) ? 'checked' : '' }}
                              ><label>{{$filter_option->option_name}}</label>
                            </div>
                            @endif
                            @endforeach
                          </div>
                        </div>
                      </div>
                      @endforeach
                      <div class="row justify-content-end">
                        <div class="col-sm-10">
                          <button type="submit" class="btn btn-primary">Lưu</button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
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
<script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min.js" type="text/javascript"></script>
<script>
  jQuery.fn.swap = function(b){
      b = jQuery(b)[0];
      var a = this[0];
      var t = a.parentNode.insertBefore(document.createTextNode(''), a);
      b.parentNode.insertBefore(a, b);
      t.parentNode.insertBefore(b, t);
      t.parentNode.removeChild(t);
      return this;
  };  
  
  $( ".dragdrop" ).draggable({ revert: false, helper: "clone" });
  
  $( ".dragdrop" ).droppable({
      accept: ".dragdrop",
      drop: function( event, ui ) {      
          var draggable = ui.draggable, droppable = $(this);
          draggable.swap(droppable);
      }
  }); 

  var selected_id;
  $(document).ready(function() {
    $(".image_select").on('click', function(event){
      selected_id = event.target.id;
      window.open('/file-manager/fm-button', 'fm', 'width=1400,height=800');
    });  
    function fmSetLink($url) {
      document.getElementById(selected_id).src = $url;
      $('#'+selected_id+'_hidden').val($url);
    }
    window.fmSetLink = fmSetLink;
  });

  document.addEventListener('DOMContentLoaded', function () {
    //flash message
    setTimeout(function() { $('.alert-success').css({"display":"none"});; }, 5000);
    
    //assign short description value
    $('#solid_work_code').html($('#solid_work_code_hidden').val());
    $('#short_description').html($('#short_description_hidden').val());
    tinymce.init({
        selector: 'textarea#short_description',
        height: 200,
        menubar: false,
        plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount'
        ],
        toolbar: 'undo redo | formatselect | ' +
            'bold italic backcolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
    });
    //assign long description value
    $('#long_description').html($('#long_description_hidden').val());
    tinymce.init({
        selector: 'textarea#long_description',
        plugins: 'print preview paste importcss searchreplace autolink image autosave directionality code visualblocks visualchars fullscreen  codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount textpattern noneditable help charmap quickbars emoticons',
        imagetools_cors_hosts: ['picsum.photos'],
        menubar: false,
        toolbar: 'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | fullscreen  preview print | image | code',
        height: 500,
        file_picker_callback: function (callback, value, meta) {
            let x = window.innerWidth || document.documentElement.clientWidth || document.getElementsByTagName('body')[0].clientWidth
            let y = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight

            tinymce.activeEditor.windowManager.openUrl({
                url: '/file-manager/tinymce5',
                title: 'Laravel File manager',
                width: x * 0.8,
                height: y * 0.8,
                onMessage: (api, message) => {
                    callback(message.content, { text: message.text })
                }
            })
        }
    });
    //assign characteristic value
    $('#characteristic').html($('#characteristic_hidden').val());
    tinymce.init({
        selector: 'textarea#characteristic',
        plugins: 'print preview paste importcss searchreplace autolink image autosave directionality code visualblocks visualchars fullscreen  codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount textpattern noneditable help charmap quickbars emoticons',
        imagetools_cors_hosts: ['picsum.photos'],
        menubar: false,
        toolbar: 'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | fullscreen  preview print | image | code',
        height: 500,
        file_picker_callback: function (callback, value, meta) {
            let x = window.innerWidth || document.documentElement.clientWidth || document.getElementsByTagName('body')[0].clientWidth
            let y = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight

            tinymce.activeEditor.windowManager.openUrl({
                url: '/file-manager/tinymce5',
                title: 'Laravel File manager',
                width: x * 0.8,
                height: y * 0.8,
                onMessage: (api, message) => {
                    callback(message.content, { text: message.text })
                }
            })
        }
    });
    //assign application value
    $('#application').html($('#application_hidden').val());
    tinymce.init({
        selector: 'textarea#application',
        plugins: 'print preview paste importcss searchreplace autolink image autosave directionality code visualblocks visualchars fullscreen  codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount textpattern noneditable help charmap quickbars emoticons',
        imagetools_cors_hosts: ['picsum.photos'],
        menubar: false,
        toolbar: 'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | fullscreen  preview print | image | code',
        height: 500,
        file_picker_callback: function (callback, value, meta) {
            let x = window.innerWidth || document.documentElement.clientWidth || document.getElementsByTagName('body')[0].clientWidth
            let y = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight

            tinymce.activeEditor.windowManager.openUrl({
                url: '/file-manager/tinymce5',
                title: 'Laravel File manager',
                width: x * 0.8,
                height: y * 0.8,
                onMessage: (api, message) => {
                    callback(message.content, { text: message.text })
                }
            })
        }
    });
    //assign user_manual value
    $('#user_manual').html($('#user_manual_hidden').val());
    tinymce.init({
        selector: 'textarea#user_manual',
        plugins: 'print preview paste importcss searchreplace autolink image autosave directionality code visualblocks visualchars fullscreen  codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount textpattern noneditable help charmap quickbars emoticons',
        imagetools_cors_hosts: ['picsum.photos'],
        menubar: false,
        toolbar: 'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | fullscreen  preview print | image | code',
        height: 500,
        file_picker_callback: function (callback, value, meta) {
            let x = window.innerWidth || document.documentElement.clientWidth || document.getElementsByTagName('body')[0].clientWidth
            let y = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight

            tinymce.activeEditor.windowManager.openUrl({
                url: '/file-manager/tinymce5',
                title: 'Laravel File manager',
                width: x * 0.8,
                height: y * 0.8,
                onMessage: (api, message) => {
                    callback(message.content, { text: message.text })
                }
            })
        }
    });
  });
</script>
@stop