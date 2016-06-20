//------------------------------------------------------------
// Section to load all of the correct detail pages.
//------------------------------------------------------------
$(document).on('click','.home-link',function () {
	loadPage(this, 'home');
});

$(document).on('click','.my-process-link',function () {
	loadPage(this, 'my-process');
});

$(document).on('click','.my-work-link',function () {
	loadPage(this, 'my-work');
});

$(document).on('click','.iwan-ivpn-project',function (e) {
	loadPage(this, "iwan-ivpn-project");
});

$(document).on('click','.vbranch-project',function () {
	loadPage(this, "vbranch-project");
});

$(document).on('click','.cloudvpn-project',function () {
	loadPage(this, "cloudvpn-project");
});

$(document).on('click','.oban-project',function () {
	loadPage(this, "oban-project");
});

$(document).on('click','.clife-project',function () {
	loadPage(this, "clife-project");
});

$(document).on('click','.elife-project',function () {
	loadPage(this, "elife-project");
});

$(document).on('click','.olympics-project',function () {
	loadPage(this, "olympics-project");
});

$(document).on('click','.mobile-project',function () {
	loadPage(this, "mobile-project");
});

//Opens the about page
$(document).on('click', '.about', function() {
	loadPage(this, 'about-page');
	setTimeout(function() {
		$('.about-page').addClass('open-about');
		$('.about-overlay').removeClass('hidden');
	},1);
})

//Closes the about page
$(document).on('click', '.about-overlay', function() {
	$('.about-page').removeClass('open-about');
	$('.about-overlay').addClass('hidden');
});

$(document).on('click','.right-arrow',function() {
		 if ($('.details').hasClass('iwan-ivpn-page')) { loadPage(this,'vbranch-project'); }
	else if ($('.details').hasClass('vbranch-page')) { loadPage(this,'cloudvpn-project'); }
	else if ($('.details').hasClass('cloudvpn-page')) { loadPage(this,'clife-project'); }
	else if ($('.details').hasClass('clife-page')) { loadPage(this,'elife-project'); }
	else if ($('.details').hasClass('elife-page')) { loadPage(this,'olympics-project'); }
	else if ($('.details').hasClass('olympics-page')) { loadPage(this,'mobile-project'); }
});

$(document).on('click','.left-arrow',function() {
		 if ($('.details').hasClass('mobile-page')) { loadPage(this,'olympics-project'); }
	else if ($('.details').hasClass('olympics-page')) { loadPage(this,'elife-project'); }
	else if ($('.details').hasClass('elife-page')) { loadPage(this,'clife-project'); }
	else if ($('.details').hasClass('clife-page')) { loadPage(this,'cloudvpn-project'); }
	else if ($('.details').hasClass('cloudvpn-page')) { loadPage(this,'vbranch-project'); }
	else if ($('.details').hasClass('vbranch-page')) { loadPage(this,'iwan-ivpn-project'); }
});

function loadPage(element, url, isBrowserBack) {
	if (!isBrowserBack) {
		window.history.pushState(url, null, null);
		$(window).scrollTop(0);
	}

	var activeLink = '.' + url;
	if (url == null || url == 'my-work') {
		showContent();
		$('.my-work').addClass('active-link');
		activeLink = '.my-work-link';
		$(window).scrollTop($('.my-work').offset().top);
	}
	else if (url == "home") {
		showContent();
		activeLink = '.home-link';
		url = 'home-link';
		$(window).scrollTop(0);
	}
	else if (url == 'my-process') {
		showContent();
		activeLink = '.my-process-link';
		url = 'my-process-link';
		$(window).scrollTop($('.my-process').offset().top);
	}
	else if (url =='about-page') {
		showContent();
		activeLink = '.about-link';
		url = 'about-link'
		$(window).scrollTop(0);
	}
	else {
		$(".details-page").load('pages/' + url + '.html');
		hideContent();
	}

	//I ran into a weird bug where offset wasn't set, so I have this simple condition to fail gracefully
	checkScrollHeaderColorClass( ($(window).offset() ? $(window).offset().top : 0));

	if (url == 'iwan-ivpn-project') { $('.left-arrow').addClass('disabled'); $('.right-arrow').removeClass('disabled'); }
	else if (url == 'mobile-project') { $('.right-arrow').addClass('disabled'); $('.left-arrow').removeClass('disabled'); }
	else { $('.left-arrow').removeClass('disabled'); $('.right-arrow').removeClass('disabled'); }

	$('.active-link').removeClass('active-link');
	//$(activeLink).addClass('active-link');	
}

function hideContent() {
	//$('.main-content').addClass('hidden');
	//$('.details-page').removeClass('hidden');
	$('.top-nav').addClass('project-page');
}

function showContent() {
	//$('.main-content').removeClass('hidden');
	//$('.details-page').addClass('hidden');
	$('.top-nav').removeClass('project-page');
}

function hideMenu() {
	$('.overlay-layer').removeClass('animate-fade-in');
	$('.nav').removeClass('animate-right');
	$('.overlay-layer').addClass('animate-fade-out');
	$('.nav').addClass('animate-left');
	$('.hamburger').removeClass('is-active');
}

function showMenu() {
	$('.overlay-layer').removeClass('animate-fade-out');
	$('.nav').removeClass('animate-left');
	$('.overlay-layer').addClass('animate-fade-in');
	$('.nav').addClass('animate-right');
	$('.hamburger').addClass('is-active');
}

window.onpopstate = function(e) {
	loadPage(null, e.state, true);
};


//Buttons to show and hide the navigation in small window mode
$(document).on('click', '.overlay-layer', function () {
	hideMenu();
});

$(document).on('click', '.show-menu', function () {
	if ($('.show-menu').hasClass('is-active')) 	{ hideMenu(); }
	else 										{ showMenu(); }
});

//Scroll events for the top-nav
var lastScrollTop = 0;

//Set the header color based on the initial scroll position
$(document).ready(function() {
	//Color the header if it's on the main title
   if (!($('.top-nav').hasClass('project-page')) && $(this).scrollTop() < $(window).height()*0.9 - $('.top-nav').height()) {	//Using 90% of the window height because the cover page is 90vh.
		$('.top-nav').addClass('on-main-header'); 
   }
   else { 
   	$('.top-nav').removeClass('on-main-header'); 
   }
});

$(window).scroll(function (event) {
	var st = $(this).scrollTop();
   if (st > lastScrollTop){
		if (st > 42) { $('.top-nav').removeClass('awake'); }
   } 
   else {
		$('.top-nav').addClass('awake');
   }
   lastScrollTop = st;

   //If the about page is open, hide it
   $('.open-about').removeClass('open-about');
   $('.about-overlay').addClass('hidden');


   checkScrollHeaderColorClass(st);
});

function checkScrollHeaderColorClass(scrollPosition) {
	 //Color the header if it's on the main title
   if (!($('.top-nav').hasClass('project-page')) && scrollPosition < $(window).height()*0.9 - $('.top-nav').height()) {	//Using 90% of the window height because the cover page is 90vh.
		$('.top-nav').addClass('on-main-header'); 
   }
   else { 
   	$('.top-nav').removeClass('on-main-header'); 
   }  
}