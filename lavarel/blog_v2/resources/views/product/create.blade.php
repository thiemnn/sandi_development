@extends('layouts.default')
@section('content')
<div class="container-xxl flex-grow-1 container-p-y">
  <h4 class="fw-bold py-3 mb-4"><span class="text-muted">Danh sách sản phẩm/</span> Thêm sản phẩm
  </h4>

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
                </ul>
                <div class="tab-content">
                  <div class="tab-pane fade show active" id="tab1" role="tabpanel">
                    <form action="/create_product" method="post" action="/action_page.php">
                      <input type="hidden" name="_token" value="<?php echo csrf_token(); ?>"><input
                        type="hidden" name="_token" value="<?php echo csrf_token(); ?>">
                      <div class="row mb-3">
                        <label class="col-sm-2 col-form-label" for="name">Tên sản phẩm</label>
                        <div class="col-sm-10">
                          <input type="text" class="form-control" id="name" name="name" placeholder="" />
                        </div>
                      </div>
                      <div class="row mb-3">
                        <label class="col-sm-2 col-form-label" for="short_description">Mô tả ngắn</label>
                        <div class="col-sm-10">
                          <textarea id="short_description" name="short_description"></textarea>
                        </div>
                      </div>
                      <div class="row mb-3">
                        <label class="col-sm-2 col-form-label" for="meta_title">Thẻ tiêu đề (Meta
                          title)</label>
                        <div class="col-sm-10">
                          <input type="text" class="form-control" id="meta_title" name="meta_title"
                            placeholder="" />
                        </div>
                      </div>
                      <div class="row mb-3">
                        <label class="col-sm-2 col-form-label" for="meta_desc">Thẻ mô tả (Meta desc)</label>
                        <div class="col-sm-10">
                          <input type="text" class="form-control" id="meta_desc" name="meta_desc"
                            placeholder="" />
                        </div>
                      </div>
                      <div class="row mb-3">
                        <label class="col-sm-2 col-form-label" for="meta_tag">Từ khóa (tags)</label>
                        <div class="col-sm-10">
                          <input type="text" class="form-control" id="meta_tag" name="meta_tag"
                            placeholder="" />
                        </div>
                      </div>

                      <div class="row mb-3">
                        <label class="col-sm-2 col-form-label" for="long_description">Mô tả</label>
                        <div class="col-sm-10">
                          <textarea id="long_description" name="long_description"></textarea>
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

                  </div>
                  <div class="tab-pane fade" id="tab3" role="tabpanel">

                  </div>
                  <div class="tab-pane fade" id="tab4" role="tabpanel">

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
<script>
  document.addEventListener('DOMContentLoaded', function () {   
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
          tinymce.init({
                  selector: 'textarea#long_description',
                  plugins: 'print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons',
                  imagetools_cors_hosts: ['picsum.photos'],
                  menubar: false,
                  toolbar: 'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | fullscreen  preview print | insertfile image ',
                  height : 500,      
                  file_picker_callback: function (callback, value, meta) {
                      let x = window.innerWidth || document.documentElement.clientWidth || document.getElementsByTagName('body')[0].clientWidth
                      let y = window.innerHeight|| document.documentElement.clientHeight|| document.getElementsByTagName('body')[0].clientHeight
  
                      tinymce.activeEditor.windowManager.openUrl({
                      url : '/file-manager/tinymce5',
                      title : 'Laravel File manager',
                      width : x * 0.8,
                      height : y * 0.8,
                      onMessage: (api, message) => {
                          callback(message.content, { text: message.text })
                      }
                      })
                  }
              });
        });
</script>
@stop