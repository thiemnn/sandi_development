@extends('layouts.default')
@section('content')
<div class="container-xxl flex-grow-1 container-p-y">
  <h4 class="fw-bold py-3 mb-4"><span class="text-muted">Danh sách tin tức/</span> Sửa tin tức</h4>

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
                      Liên kết
                    </button>
                  </li>
                </ul>
                <div class="tab-content">
                  <div class="tab-pane fade show active" id="tab1" role="tabpanel">
                    <form action="/update_news_overview/{{ $news->id }}" method="post"
                      action="/action_page.php">
                      <input type="hidden" name="_token" value="<?php echo csrf_token(); ?>"><input
                        type="hidden" name="_token" value="<?php echo csrf_token(); ?>">
                      <div class="row mb-3">
                        <label class="col-sm-2 col-form-label" for="title">Tên sản phẩm</label>
                        <div class="col-sm-10">
                          <input type="text" class="form-control" id="title" value="{{ $news->title }}"
                            name="title" placeholder="" />
                        </div>
                      </div>
                      <div class="row mb-3">
                        <label class="col-sm-2 col-form-label" for="short_description">Mô tả ngắn</label>
                        <div class="col-sm-10">
                          <textarea id="short_description" name="short_description"
                            value="{{ $news->short_description }}"></textarea>
                          <input type="hidden" id="short_description_hidden" name="short_description_hidden"
                            value="{{ $news->short_description }}">
                        </div>
                      </div>
                      <div class="row mb-3">
                        <label class="col-sm-2 col-form-label" for="meta_title">Thẻ tiêu đề (Meta
                          title)</label>
                        <div class="col-sm-10">
                          <input type="text" class="form-control" id="meta_title" name="meta_title"
                            value="{{ $news->meta_title }}" placeholder="" />
                        </div>
                      </div>
                      <div class="row mb-3">
                        <label class="col-sm-2 col-form-label" for="meta_desc">Thẻ mô tả (Meta desc)</label>
                        <div class="col-sm-10">
                          <input type="text" class="form-control" id="meta_desc" name="meta_desc"
                            value="{{ $news->meta_desc }}" placeholder="" />
                        </div>
                      </div>
                      <div class="row mb-3">
                        <label class="col-sm-2 col-form-label" for="meta_tag">Từ khóa (tags)</label>
                        <div class="col-sm-10">
                          <input type="text" class="form-control" id="meta_tag" name="meta_tag"
                            value="{{ $news->meta_tag }}" placeholder="" />
                        </div>
                      </div>

                      <div class="row mb-3">
                        <label class="col-sm-2 col-form-label" for="content">Nội dung</label>
                        <div class="col-sm-10">
                          <textarea id="content" name="content"></textarea>
                          <input type="hidden" id="content_hidden" name="content_hidden"
                            value="{{ $news->content }}">
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
                    <form action="/update_news_link/{{ $news->id }}" method="post" action="/action_page.php">
                      <input type="hidden" name="_token" value="<?php echo csrf_token(); ?>"><input type="hidden" name="_token"
                        value="<?php echo csrf_token(); ?>">
                      <div class="row mb-3">
                        <label class="col-sm-2 col-form-label" for="name">Ảnh đại diện</label>
                        <div class="col-sm-4">
                          <div class="div_image_container img-thumbnail">
                            <img class="image_select" id="img_image" name="img_image" src="{{empty($news->image) ? "
                              https://sandivietnam.com/image/cache/no_image-100x100.png" : $news->image}}"
                            alt="" title="">
                            <input type="hidden" id="img_image_hidden" name="image" value="{{ $news->image }}" />
                          </div>
                        </div>
                      </div>
                      <div class="row mb-3">
                        <label class="col-sm-2 col-form-label" for="">Danh mục</label>
                        <div class="col-sm-10">
                          <div class="div_select_categories">
                            @foreach ($news_categories as $item)
                            <div class="even">
                              <input type="checkbox" name="news_categories[]" value="{{ $item->id }}"  {{ existNewsCategory($assigned_categories, $item->id) ? 'checked' : '' }}>
                              {{ $item->name }}<br>
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
    $('#content').html($('#content_hidden').val());
    tinymce.init({
        selector: 'textarea#content',
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