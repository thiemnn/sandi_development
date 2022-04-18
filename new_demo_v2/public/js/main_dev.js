$(document).ready(function() {
	$('.nice-select').niceSelect();
	jQuery('.hb-menu nav').meanmenu({
		meanMenuContainer: '.mobile-menu',
		meanScreenWidth: "991"
	})

	$('.product-details-images').each(function(){
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
	$('.product-details-thumbs').each(function(){
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
	$('.tab-style-left, .tab-style-right').each(function(){
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
	var gallery1 = $('.li-blog-gallery-slider-1');
	gallery1.slick({
		arrows: false,
		autoplay: true,
		autoplaySpeed: 5000,
		pauseOnFocus: false,
		pauseOnHover: false,
		fade: true,
		dots: true,
		infinite: true,
		slidesToShow: 1,
		responsive: [
			{
				breakpoint: 768,
					settings: {
						arrows: false,
				}
			},
		]
	});
	var gallery2 = $('.li-blog-gallery-slider-2');
	gallery2.slick({
		arrows: false,
		autoplay: true,
		autoplaySpeed: 5000,
		pauseOnFocus: false,
		pauseOnHover: false,
		fade: true,
		dots: true,
		infinite: true,
		slidesToShow: 1,
		responsive: [
			{
				breakpoint: 768,
					settings: {
						arrows: false,
				}
			},
		]
	});
	var gallery3 = $('.li-blog-gallery-slider-3');
	gallery3.slick({
		arrows: false,
		autoplay: true,
		autoplaySpeed: 5000,
		pauseOnFocus: false,
		pauseOnHover: false,
		fade: true,
		dots: true,
		infinite: true,
		slidesToShow: 1,
		responsive: [
			{
				breakpoint: 768,
					settings: {
						arrows: false,
				}
			},
		]
	});
	var gallery4 = $('.li-blog-gallery-slider-4');
	gallery4.slick({
		arrows: false,
		autoplay: true,
		autoplaySpeed: 5000,
		pauseOnFocus: false,
		pauseOnHover: false,
		fade: true,
		dots: true,
		infinite: true,
		slidesToShow: 1,
		responsive: [
			{
				breakpoint: 768,
					settings: {
						arrows: false,
				}
			},
		]
	});
	var gallery5 = $('.li-blog-gallery-slider-5');
	gallery5.slick({
		arrows: false,
		autoplay: true,
		autoplaySpeed: 5000,
		pauseOnFocus: false,
		pauseOnHover: false,
		fade: true,
		dots: true,
		infinite: true,
		slidesToShow: 1,
		responsive: [
			{
				breakpoint: 768,
					settings: {
						arrows: false,
				}
			},
		]
	});
	var gallery6 = $('.li-blog-gallery-slider-6');
	gallery6.slick({
		arrows: false,
		autoplay: true,
		autoplaySpeed: 5000,
		pauseOnFocus: false,
		pauseOnHover: false,
		fade: true,
		dots: true,
		infinite: true,
		slidesToShow: 1,
		responsive: [
			{
				breakpoint: 768,
					settings: {
						arrows: false,
				}
			},
		]
	});
	tinymce.init({
		selector: '#mytextarea',
		plugins: 'code table lists image imagetool',
		toolbar: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | image",
		file_picker_callback: function (callback, value, meta) {
			let x = window.innerWidth || document.documentElement.clientWidth || document.getElementsByTagName('body')[0].clientWidth;
			let y = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight;

			let type = 'image' === meta.filetype ? 'Images' : 'Files',
				url = '/blog/public/laravel-filemanager?editor=tinymce5&type=' + type;

			tinymce.activeEditor.windowManager.openUrl({
				url: url,
				title: 'Filemanager',
				width: x * 0.8,
				height: y * 0.8,
				onMessage: (api, message) => {
					callback(message.content);
				}
			});
		}
	});
});
