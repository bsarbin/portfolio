//------------------------------------------------------------
// Section to load all of the correct detail pages.
//------------------------------------------------------------
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

function loadPage(element, url, isBrowserBack) {
	var activeLink = '.' + url;

	if (url == null) {
		showContent();
		$('.my-process').addClass('active-link');
		$(window).scrollTop(0);
		activeLink = '.my-process-link';
	}
	else if (url == 'my-process') {
		showContent();
		$(window).scrollTop($(".my-process").position().top);
		activeLink = '.my-process-link';
	}
	else if (url == 'my-work') {
		showContent();
		$(window).scrollTop($(".my-work").position().top);
		activeLink = '.my-work-link';
	}
	else {
		$(".details-page").load('pages/' + url + '.html');
		hideContent();
		$(window).scrollTop(0);
	}

	$('.active-link').removeClass('active-link');
	$(activeLink).addClass('active-link');

	if (!isBrowserBack) {
		history.pushState(url, null, null);
	}

	if ($(window).width() < 900) {
		hideMenu();
	}
}

function hideContent() {
	$('.main-content').addClass('hidden');
	$('.details-page').removeClass('hidden');
}

function showContent() {
	$('.main-content').removeClass('hidden');
	$('.details-page').addClass('hidden');
}

function hideMenu() {
	$('.overlay-layer').removeClass('animate-fade-in');
	$('.nav').removeClass('animate-right');
	$('.overlay-layer').addClass('animate-fade-out');
	$('.nav').addClass('animate-left');
}

function showMenu() {
	$('.overlay-layer').removeClass('animate-fade-out');
	$('.nav').removeClass('animate-left');
	$('.overlay-layer').addClass('animate-fade-in');
	$('.nav').addClass('animate-right');
}

window.addEventListener('popstate', function(e){
	loadPage(null, e.state, true);
});


//Buttons to show and hide the navigation in small window mode
$(document).on('click', '.overlay-layer', function () {
	hideMenu();
});

$(document).on('click', '.show-menu', function () {
	showMenu();
});