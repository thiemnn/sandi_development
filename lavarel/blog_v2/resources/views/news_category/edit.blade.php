@extends('layouts.default')
@section('content')
<div class="container-xxl flex-grow-1 container-p-y">
  <h4 class="fw-bold py-3 mb-4"><span class="text-muted">Danh mục sản phẩm/</span> Sửa danh mục</h4>

  <!-- Basic Layout & Basic with Icons -->
  <div class="row">
    <!-- Basic Layout -->
    <div class="col-xxl">
      <div class="card mb-4">
        <div class="card-body">
          <!-- Pills -->
          <div class="row">
            <div class="col-xl-12">
              <form action="/update_news_category/{{ $news_category->id }}" method="post" action="/action_page.php">
                <input type="hidden" name="_token" value="<?php echo csrf_token(); ?>"><input
                  type="hidden" name="_token" value="<?php echo csrf_token(); ?>">
                <div class="row mb-3">
                  <label class="col-sm-2 col-form-label" for="name">Tên danh mục</label>
                  <div class="col-sm-10">
                    <input type="text" class="form-control" id="name" name="name" placeholder="" value="{{ $news_category->name }}"/>
                  </div>
                </div>
                <div class="row mb-3">
                  <label class="col-sm-2 col-form-label" for="description">Mô tả</label>
                  <div class="col-sm-10">
                    <textarea id="description" name="description"></textarea>
                    <input type="hidden" id="description_hidden" name="description_hidden"
                            value="{{ $news_category->description }}">
                  </div>
                </div>
                <div class="row mb-3">
                  <label class="col-sm-2 col-form-label" for="meta_title">Thẻ tiêu đề (Meta
                    title)</label>
                  <div class="col-sm-10">
                    <input type="text" class="form-control" id="meta_title" name="meta_title" value="{{ $news_category->meta_title }}"
                      placeholder="" />
                  </div>
                </div>
                <div class="row mb-3">
                  <label class="col-sm-2 col-form-label" for="meta_desc">Thẻ mô tả (Meta desc)</label>
                  <div class="col-sm-10">
                    <input type="text" class="form-control" id="meta_desc" name="meta_desc" value="{{ $news_category->meta_desc }}"
                      placeholder="" />
                  </div>
                </div>
                <div class="row mb-3">
                  <label class="col-sm-2 col-form-label" for="meta_tag">Từ khóa (tags)</label>
                  <div class="col-sm-10">
                    <input type="text" class="form-control" id="meta_tag" name="meta_tag" value="{{ $news_category->meta_tag }}"
                      placeholder="" />
                  </div>
                </div>
                <div class="row mb-3">
                  <label class="col-sm-2 col-form-label" for="image">Hình ảnh</label>
                  <div class="col-sm-10">
                    <a href="" id="thumb-image" data-toggle="image" class="img-thumbnail">
                      <img id="img_image" name="img_image" src="{{empty($news_category->image) ? "
                      https://sandivietnam.com/image/cache/no_image-100x100.png" : $news_category->image}}" alt="" title="">
                      <input type="hidden" id="image" name="image" value="{{ $news_category->image }}" />
                    </a>
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
<script src="https://cdn.tiny.cloud/1/e8f9z2k2n997m14yd0yhcwdzixvzcoxp4pmvpb2xcb1xdfoj/tinymce/5/tinymce.min.js"
  referrerpolicy="origin"></script>
<script>
  document.addEventListener('DOMContentLoaded', function () {
                document.getElementById('thumb-image').addEventListener('click', (event) => {
                    event.preventDefault();
                    window.open('/file-manager/fm-button', 'fm', 'width=1400,height=800');
                });
                function fmSetLink($url) {
                    document.getElementById('img_image').src = $url;   
                    $('#image').val($url)
                }
                window.fmSetLink = fmSetLink;
                $('#description').html($('#description_hidden').val());
                tinymce.init({
                    selector: 'textarea#description',
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