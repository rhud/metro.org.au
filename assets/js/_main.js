var andrzejdus;

var BrowserDetect = 
{
	init: function () {
		this.browser = this.searchString(this.dataBrowser) || 'Other';
		this.version = this.searchVersion(navigator.userAgent) ||       this.searchVersion(navigator.appVersion) || 'Unknown';
	},

	searchString: function (data) 
	{
		for (var i=0 ; i < data.length ; i++) {
			var dataString = data[i].string;
			this.versionSearchString = data[i].subString;
			if (dataString.indexOf(data[i].subString) !== -1) {
				return data[i].identity;
			}
		}
	},

	searchVersion: function (dataString) {
		var index = dataString.indexOf(this.versionSearchString);
		if (index === -1) { return; }
		return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
	},

	dataBrowser: 
	[
		{ string: navigator.userAgent, subString: 'Chrome',  identity: 'Chrome' },
		{ string: navigator.userAgent, subString: 'MSIE',    identity: 'Explorer' },
		{ string: navigator.userAgent, subString: 'Firefox', identity: 'Firefox' },
		{ string: navigator.userAgent, subString: 'Safari',  identity: 'Safari' },
		{ string: navigator.userAgent, subString: 'Opera',   identity: 'Opera' }
	]
};

BrowserDetect.init();

function showHero() {
	var msg = $('.heromsg');
	var msgIndex = -1;

	function showNextMsg() {
        ++msgIndex;
        msg.eq(msgIndex % msg.length)
            .delay(400)
            .animate({marginTop:'0px',opacity:'1.0'}, 400, showNextMsg);
		}
	showNextMsg();
	setInterval(function() {$('.hero-border').addClass('hero-anim');}, 3000);
}

$(window).load(function(){
	setTimeout(function() {
		$('.wrap').css('visibility','visible');
		$('.loader .icon-spin').hide();
		//$('.fadeIn').fadeTo(0, 0);
		$('.loader').fadeOut(1000);
		setTimeout(function() {
			$('body').removeClass('loading');
		}, 1000);
	}, 1000);
	setTimeout(function() {
		$('header').css({'visibility':'visible', 'margin-top':'0px'});
	},2000);
	setTimeout(showHero, 2000);
});

$('document').ready(function () {

	$('#home').height($(window).height());
	
	//$('#hero').css('margin-top', '-' + $(this).outerHeight / 2 + 'px');
	//console.log('hero height = ' + $('#hero').outerHeight());
	
	var nav = $('nav'),
	navItems = nav.find('a'),
	scrollItems = navItems.map(function(){
	  var item = $($(this).attr('href'));
	  if (item.length) { return item; }
	});
	
	$('nav a').click(function(){
	    //$('body, html').animate({scrollTop:1});
	});
	
	$(window).on('scroll', function() {
		// Hide HERO
        if($(this).scrollTop() >= 150) {
			$('#hero').fadeOut(500);
		} else {
			$('#hero').fadeIn(300);
		}
        
        // Change Nav colour
        var windowHeight = $(window).height();
        //console.log('wheight = ' + windowHeight);
        if($(this).scrollTop() >= windowHeight - 100) {
			$('header').addClass('alt');
		} else {
			$('header').removeClass('alt');
		}
        
        // Get container scroll position
		var fromTop = $(this).scrollTop();

		//distance < 30 && distance > -30 && currentHash != hash
		
		// Get id of current scroll item
		var cur = scrollItems.map(function(){
			if ($(this).offset().top < fromTop) {
				return this;
			}
		});
		// Get the id of the current element
		cur = cur[cur.length-1];
		var id = cur && cur.length ? cur[0].id : '';
		// Set/remove active class
		navItems
		 .parent().removeClass('active')
		 .end().filter('[href=#'+id+']').parent().addClass('active');
		  //window.location.hash = id;
		  console.log(id);
		  
		$('.fadeIn').each(function() {
			var a = $(this).offset().top + $(this).height();
			var b = $(window).scrollTop() + $(window).height();
			if (a < b) {
				$(this).fadeTo(1000,1);
			}
		});
    });
	
	
	if (BrowserDetect.browser !== 'Explorer' && BrowserDetect.browser !== 'Other') {
		andrzejdus.parallaxer.Parallaxer.setSmoothScrollEnabled(true);
	    andrzejdus.parallaxer.Parallaxer.start();
	}
	console.log(BrowserDetect.browser);
});