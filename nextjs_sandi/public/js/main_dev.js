
var number_of_load_product_fail = 0;
function loadProductDetail() {
	if(number_of_load_product_fail > 30){
		return;
	}
	if ($('.single-product-area').length) {
		$('.product-details-images').each(function () {
			var $this = $(this);
			var $thumb = $this.siblings('.product-details-thumbs, .tab-style-left');
			$this.slick({
				arrows: false,
				slidesToShow: 1,
				slidesToScroll: 1,
				autoplay: false,
				autoplaySpeed: 5000,
				dots: false,
				infinite: true,
				centerMode: false,
				centerPadding: 0,
				asNavFor: $thumb,
			});
		});
		$('.product-details-thumbs').each(function () {
			var $this = $(this);
			var $details = $this.siblings('.product-details-images');
			$this.slick({
				slidesToShow: 4,
				slidesToScroll: 1,
				autoplay: false,
				autoplaySpeed: 5000,
				dots: false,
				infinite: true,
				focusOnSelect: true,
				centerMode: true,
				centerPadding: 0,
				prevArrow: '<span class="slick-prev"><i class="fa fa-angle-left"></i></span>',
				nextArrow: '<span class="slick-next"><i class="fa fa-angle-right"></i></span>',
				asNavFor: $details,
			});
		});
		
	}
	else {
		number_of_load_product_fail += 1;
		setTimeout(loadProductDetail, 100);
	}
}

var number_of_load_search_select = 0;
function loadSearchSelect() {
	if(number_of_load_search_select > 30){
		return;
	}
	if ($('.select-search-category').length) {
		$('.select-search-category').niceSelect();
		jQuery('.hb-menu nav').meanmenu({
			meanMenuContainer: '.mobile-menu',
			meanScreenWidth: "991"
		})		
	}
	else {
		number_of_load_search_select += 1;
		setTimeout(loadSearchSelect, 100);
	}
}

var number_of_load_home_slide = 0;
function loadHomeSlide() {
	if(number_of_load_home_slide > 30){
		return;
	}
	if ($('.slider-active').length) {
		$(".slider-active").owlCarousel({
			loop: true,
			margin: 0,
			nav: true,
			autoplay: true,
			items: 1,
			autoplayTimeout: 10000,
			navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
			dots: true,
			autoHeight: true,
			lazyLoad: true
		});	
		$(".product-active").owlCarousel({
			loop: true,
			nav: true,
			dots: false,
			autoplay: false,
			autoplayTimeout: 5000,
			navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
			item: 5,
			responsive: {
				0: {
						items: 1
				},
				480: {
						items: 2
				},
				768: {
						items: 3
				},
				992: {
						items: 4
				},
				1200: {
						items: 5
				}
			}
		});	
	}
	else {
		number_of_load_home_slide += 1;
		setTimeout(loadHomeSlide, 100);
	}
}

$(document).ready(function() {
	
});

document.addEventListener("DOMContentLoaded", function () {
	setTimeout(loadProductDetail, 100);
	setTimeout(loadSearchSelect, 100);
	setTimeout(loadHomeSlide, 100);
	

	$('.product-details-images').each(function () {
		var $this = $(this);
		var $thumb = $this.siblings('.product-details-thumbs, .tab-style-left');
		$this.slick({
			arrows: false,
			slidesToShow: 1,
			slidesToScroll: 1,
			autoplay: false,
			autoplaySpeed: 5000,
			dots: false,
			infinite: true,
			centerMode: false,
			centerPadding: 0,
			asNavFor: $thumb,
		});
	});
	$('.product-details-thumbs').each(function () {
		var $this = $(this);
		var $details = $this.siblings('.product-details-images');
		$this.slick({
			slidesToShow: 4,
			slidesToScroll: 1,
			autoplay: false,
			autoplaySpeed: 5000,
			dots: false,
			infinite: true,
			focusOnSelect: true,
			centerMode: true,
			centerPadding: 0,
			prevArrow: '<span class="slick-prev"><i class="fa fa-angle-left"></i></span>',
			nextArrow: '<span class="slick-next"><i class="fa fa-angle-right"></i></span>',
			asNavFor: $details,
		});
	});
	$('.tab-style-left, .tab-style-right').each(function () {
		var $this = $(this);
		var $details = $this.siblings('.product-details-images');
		$this.slick({
			slidesToShow: 3,
			slidesToScroll: 1,
			autoplay: false,
			autoplaySpeed: 5000,
			dots: false,
			infinite: true,
			focusOnSelect: true,
			vertical: true,
			centerPadding: 0,
			prevArrow: '<span class="slick-prev"><i class="fa fa-angle-down"></i></span>',
			nextArrow: '<span class="slick-next"><i class="fa fa-angle-up"></i></span>',
			asNavFor: $details,
		});
	});

	setTimeout(function(){
		$('#searchProduct').click(function(){
			var searchText = $('#searchText').val();
			var search_category_id = $('#search_category_id').val()
			if(searchText != ''){
				window.location.href = '/search_product?search=' + searchText + '&category_id=' + search_category_id
			}
		});
		$('.paulund_modal').paulund_modal_box();
	}, 1000);
});

$(document).on('keypress',function(e) {
	if (e.which == 13) {
		var searchText = $('#searchText').val();
		var search_category_id = $('#search_category_id').val()
		if(searchText != ''){
			window.location.href = '/search_product?search=' + searchText + '&category_id=' + search_category_id
		}		
	}
});

$(document).on("click","#request_quotation",function() {
	var values = $("input[name='property_values[]']")
              .map(function(){return $(this).val();}).get();
	var properties = [];
	$('label.form-label').each(function(){
		properties.push($(this).text());
	});
	var email = localStorage.getItem('email')
	var user_id = localStorage.getItem('user_id')
	if(user_id = null || user_id == undefined || user_id == 'null' || user_id == ''){
		showModel('Vui lòng đăng nhập để gửi yêu cầu báo giá')
		return;
	}
	var data = {
		properties: JSON.stringify(properties),
		values: JSON.stringify(values),
		email: email
	}

	$.ajax({
		type: 'POST',
		data: JSON.stringify(data),
		contentType: 'application/json',
		url: 'http://localhost:9000/products/requestQuotation',						
		success: function(data) {
			showModel('Gửi yêu cầu báo giá thành công')
		},
		error : function(request,error){
			showModel('Không thể gửi yêu cầu báo giá')
		}
	});
});

function showModel(message){
	var html = '<div class="modal fade show" id="dialogModel" tabindex="-1" role="dialog" aria-labelledby="dialogModelLabel" aria-hidden="true">'
	html += '<div class="modal-dialog" role="document">'
	html += '	<div class="modal-content">'
	html += '		<div class="modal-header">'
	html += '			<h5 class="modal-title" id="dialogModelLabel">Thông báo từ Sandi Việt Nam</h5>'
	html += '			<button type="button" class="close closeModel" data-dismiss="modal" aria-label="Close">'
	html += '				<span aria-hidden="true">&times;</span>'
	html += '			</button>'
	html += '		</div>'
	html += '		<div class="modal-body">'
	html += message
	html += '		</div>'
	html += '		<div class="modal-footer">'
	html += '			<button type="button" class="btn btn-secondary closeModel" data-dismiss="modal">Close</button>'
	html += '		</div>'
	html += '	</div>'
	html += '</div>'
	html += '</div>'
	var block_page = $(html);                        
    $(block_page).appendTo('body');
	$('.closeModel').click(function(){
		$('#dialogModel').fadeOut().remove();                 
	});
}
