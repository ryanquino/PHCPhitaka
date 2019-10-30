function tabSlider() {
	var $li1 = $('header li:nth-child(1)').outerWidth(),
		$li2 = $('header li:nth-child(2)').outerWidth(),
		$li3 = $('header li:nth-child(3)').outerWidth(),
		$li4 = $('header li:nth-child(4)').outerWidth(),
		$li5 = $('header li:nth-child(5)').outerWidth(),
		$li6 = $('header li:nth-child(6)').outerWidth();

	if ($('header li:nth-child(1)').hasClass('active')) {
		$('.slider').css({
			'transform': 'translate(0, 0)',
			'width': $li1
		});
	} else if ($('header li:nth-child(2)').hasClass('active')) {
		$('.slider').css({
			'transform': 'translate(' + $li1 + 'px, 0)',
			'width': $li2
		});
	} else if ($('header li:nth-child(3)').hasClass('active')) {
		$('.slider').css({
			'transform': 'translate(' + ($li1 + $li2) + 'px, 0)',
			'width': $li3
		});
	} else if ($('header li:nth-child(4)').hasClass('active')) {
		$('.slider').css({
			'transform': 'translate(' + ($li1 + $li2 + $li3) + 'px, 0)',
			'width': $li4
		});
	} else if ($('header li:nth-child(5)').hasClass('active')) {
		$('.slider').css({
			'transform': 'translate(' + ($li1 + $li2 + $li3 + $li4) + 'px, 0)',
			'width': $li5
		});
	} else if ($('header li:nth-child(6)').hasClass('active')) {
		$('.slider').css({
			'transform': 'translate(' + ($li1 + $li2 + $li3 + $li4 + $li5) + 'px, 0)',
			'width': $li6
		});
	}
};

function cardHeight() {
	$('.card').each(function() {
		$(this).height($(this).width() + 56);
	});
};

function headerPadding() {
	var $headerHeight = $('header').outerHeight();
	$('main').css('padding-top', $headerHeight);
};
    //* Add Phone no select
    function phoneNoselect(){
        if ( $('#msform').length ){   
            $("#phone").intlTelInput(); 
            $("#phone").intlTelInput("setNumber", "+880"); 
        };
    }; 
    //* Select js
    function nice_Select(){
        if ( $('.product_select').length ){ 
            $('select').niceSelect();
        };
    }; 
$(function() {
	"use strict";

	// TABS

	$('header li').on('click', function() {
		$('header li').removeClass('active');
		$(this).addClass('active');
		tabSlider();
	});

	// CARD HEIGHT & 'MAIN' PADDING

	$(window, 'main').resize(function() {
		cardHeight();
		headerPadding();
	}).resize();

	// HEADER SHADOW

	$(window).scroll(function() {
		if ($(this).scrollTop() >= 10) {
			$("header").addClass("shadow");
		} else {
			$("header").removeClass("shadow");
		}
	});

	// MENU

	$('.menu, .side-menu-overlay').on('click', function() {
		var $sidebarWidth = $('.side-menu').width();
		$('.side-menu').toggleClass('active');
		if ($('.side-menu').hasClass('active')) {
			$('header, main').css('width', 'calc(100% - ' + $sidebarWidth + 'px)');
		} else {
			$('header, main').css('width', '100%');
		}
	});

	// PROFILE MENU

	$('.profile').on('click', function() {
		$('.account').toggleClass('active');
	});

	$(document).on("click", function(e) {
		if (($(".account").hasClass("active")) && (!$(".account, .account *, .profile").is(e.target))) {
			$(".account").toggleClass("active");
		}
	});

	$(window).scroll(function() {
		$('.account').removeClass('active');
	});
	
	// MOBILE SEARCH BUTTON

	$('label.mobile-only').on('click', function() {
		$(this).toggleClass('close');
		$('body').toggleClass('mobile-input');
	})
	
	// RIPPLE
  // CODE FROM HENDRY SADRAK'S PEN - https://codepen.io/hendrysadrak/pen/yNKZWO

	$(document).on('click', '.ripple', function(e) {

		var $ripple = $('<span class="rippling" />'),
			$button = $(this),
			btnOffset = $button.offset(),
			xPos = e.pageX - btnOffset.left,
			yPos = e.pageY - btnOffset.top,
			size = 0,
			animateSize = parseInt(Math.max($button.width(), $button.height()) * Math.PI);

		$ripple.css({
				top: yPos,
				left: xPos,
				width: size,
				height: size,
				backgroundColor: $button.attr("ripple-color"),
				opacity: $button.attr("ripple-opacity")
			})
			.appendTo($button)
			.animate({
				width: animateSize,
				height: animateSize,
				opacity: 0
			}, 500, function() {
				$(this).remove();
			});
	});
	var current_fs, next_fs, previous_fs; //fieldsets
	var left, opacity, scale; //fieldset properties which we will animate
	var animating; //flag to prevent quick multi-click glitches
	$('.next').on('click', function() {
            
		if (animating) return false;
		animating = true;

		current_fs = $(this).parent();
		next_fs = $(this).parent().next();

		//activate next step on progressbar using the index of next_fs
		$("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

		//show the next fieldset
		next_fs.show();
		//hide the current fieldset with style
		current_fs.animate({
			opacity: 0
		}, {
			step: function (now, mx) {
				//as the opacity of current_fs reduces to 0 - stored in "now"
				//1. scale current_fs down to 80%
				scale = 1 - (1 - now) * 0.2;
				//2. bring next_fs from the right(50%)
				left = (now * 50) + "%";
				//3. increase opacity of next_fs to 1 as it moves in
				opacity = 1 - now;
				current_fs.css({
					'transform': 'scale(' + scale + ')',
					'position': 'absolute'
				});
				next_fs.css({
					'left': left,
					'opacity': opacity
				});
			},
			duration: 800,
			complete: function () {
				current_fs.hide();
				animating = false;
			},
			//this comes from the custom easing plugin
			easing: 'easeInOutBack'
		});
	});
	$(".previous").on('click', function() {
		if (animating) return false;
		animating = true;

		current_fs = $(this).parent();
		previous_fs = $(this).parent().prev();

		//de-activate current step on progressbar
		$("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");

		//show the previous fieldset
		previous_fs.show();
		//hide the current fieldset with style
		current_fs.animate({
			opacity: 0
		}, {
			step: function (now, mx) {
				//as the opacity of current_fs reduces to 0 - stored in "now"
				//1. scale previous_fs from 80% to 100%
				scale = 0.8 + (1 - now) * 0.2;
				//2. take current_fs to the right(50%) - from 0%
				left = ((1 - now) * 50) + "%";
				//3. increase opacity of previous_fs to 1 as it moves in
				opacity = 1 - now;
				current_fs.css({
					'left': left
				});
				previous_fs.css({
					'transform': 'scale(' + scale + ')',
					'opacity': opacity
				});
			},
			duration: 800,
			complete: function () {
				current_fs.hide();
				animating = false;
			},
			//this comes from the custom easing plugin
			easing: 'easeInOutBack'
		});
	});

	$(".submit").on('click', function() {
		return false;
	})

	// IOS STUFF

	if (navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
		$('body').addClass('ios');
	}
	
});



