
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
		$('.nice-select').niceSelect();
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

document.addEventListener("DOMContentLoaded", function () {
	setTimeout(loadProductDetail, 100);
	setTimeout(loadSearchSelect, 100);

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
	// $(".product-active").owlCarousel({
	// 	loop: true,
	// 	nav: true,
	// 	dots: false,
	// 	autoplay: false,
	// 	autoplayTimeout: 5000,
	// 	navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
	// 	item: 5,
	// 	responsive: {
	// 		0: {
	// 			items: 1
	// 		},
	// 		480: {
	// 			items: 2
	// 		},
	// 		768: {
	// 			items: 3
	// 		},
	// 		992: {
	// 			items: 4
	// 		},
	// 		1200: {
	// 			items: 5
	// 		}
	// 	}
	// });

	setTimeout(function(){
		// $('.category-sub-menu li.has-sub > a').on('click', function () {
		// 	$(this).removeAttr('href');
		// 	var element = $(this).parent('li');
		// 	if (element.hasClass('open')) {
		// 		element.removeClass('open');
		// 		element.find('li').removeClass('open');
		// 		element.find('ul').slideUp();
		// 	} else {
		// 		element.addClass('open');
		// 		element.children('ul').slideDown();
		// 		element.siblings('li').children('ul').slideUp();
		// 		element.siblings('li').removeClass('open');
		// 		element.siblings('li').find('li').removeClass('open');
		// 		element.siblings('li').find('ul').slideUp();
		// 	}
		// });

		// $('.nice-select').niceSelect();
		// jQuery('.hb-menu nav').meanmenu({
		// 	meanMenuContainer: '.mobile-menu',
		// 	meanScreenWidth: "991"
		// })
	}, 1000);
});
