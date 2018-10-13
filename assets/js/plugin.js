(function($) {

	"use strict";
	
	/* - Google Map */
	function initialize(obj) {

		var lat = $('#'+obj).attr("data-lat");
		var lng = $('#'+obj).attr("data-lng");
		var contentString = $('#'+obj).attr("data-string");
		var myLatlng = new google.maps.LatLng(lat,lng);
		var map, marker, infowindow;
		var image = $('#'+obj).attr("data-marker");
		var zoomLevel = parseInt($("#"+obj).attr("data-zoom") ,10);
		var styles = [{"featureType": "administrative.province","elementType": "all","stylers": [{"visibility": "off"}]},
					 {"featureType": "landscape","elementType": "all","stylers": [{"saturation": -100},{"lightness": 65},{"visibility": "on"}]},
					 {"featureType": "poi","elementType": "all","stylers": [{"saturation": -100},{"lightness": 51},{"visibility": "simplified"}]},
					 {"featureType": "road.highway","elementType": "all","stylers": [{"saturation": -100},{"visibility": "simplified"}]},
					 {"featureType": "road.arterial","elementType": "all","stylers": [{"saturation": -100},{"lightness": 30},{"visibility": "on"}]},
					 {"featureType": "road.local","elementType": "all","stylers": [{"saturation": -100},{"lightness": 40},{"visibility": "on"}]},
					 {"featureType": "transit","elementType": "all","stylers": [{"saturation": -100},{"visibility": "simplified"}]},
					 {"featureType": "transit","elementType": "geometry.fill","stylers": [{"visibility": "on"}]},
					 {"featureType": "water","elementType": "geometry","stylers": [{"hue": "#ffff00"},{"lightness": -25},{"saturation": -97}]},
					 {"featureType": "water","elementType": "labels","stylers": [{"visibility": "on"},{"lightness": -25},{"saturation": -100}]}]
		var styledMap = new google.maps.StyledMapType(styles,{name: "Styled Map"});	
		var mapOptions = {
			zoom: zoomLevel,
			disableDefaultUI: true,
			center: myLatlng,
            scrollwheel: false,
			mapTypeControlOptions: {
            mapTypeIds: [google.maps.MapTypeId.ROADMAP, "map_style"]
			}
		}
		map = new google.maps.Map(document.getElementById(obj), mapOptions);	
		map.mapTypes.set('map_style', styledMap);
		map.setMapTypeId('map_style');
		infowindow = new google.maps.InfoWindow({
			content: contentString,
			maxWidth: 300
		});		
		marker = new google.maps.Marker({
			position: myLatlng,
			map: map,
			icon: image
		});
		if(contentString != '') {
			google.maps.event.addListener(marker, 'click', function() {
				infowindow.open(map,marker);
			});	
		}
	}
	
	window.initMap = function() {}
	
	/* - Gallery */
	function gallery() {
		if($(".gallery-fitrow").length){
			var $container = $(".gallery-fitrow");
			$container.isotope({
				layoutMode: 'fitRows',
				itemSelector: ".gallery-box",
				gutter: 0,
				transitionDuration: "0.5s"
			});
			
			$("#filters a").on("click",function(){
				$('#filters a').removeClass("active");
				$(this).addClass("active");
				var selector = $(this).attr("data-filter");
				$container.isotope({ filter: selector });		
				return false;
			});
		}
	}
	
	/* - Blog Section Video Height */
	function blog_video_height() {
		var width = $(window).width();
		var cnt_height = $(".latest-post article .entry-cover img").height();
		$(".latest-post article .entry-cover iframe").css("min-height", cnt_height);	
	}
	
	/* - gallery Video Height */
	function gallery_video_height() {
		var width = $(window).width();
		var cnt_height = $(".gallery-section .gallery-list .gallery-box img").height();
		$(".gallery-section .gallery-list .gallery-box iframe").css("height", cnt_height);	
	}

	/* Event - Document Ready */
	$(document).on("ready",function() {
	
		/* - Event Gallery Carousel */
		if( $(".event_gallery-carousel").length ) {
			$(".event_gallery-carousel").owlCarousel({
				loop: $(".event_gallery-carousel > .item").length <= 3 ? false : true,
				margin: 30,
				nav: false,
				rtl: true,
				dots: false,
				autoplay: true,
				responsive:{
					0:{
						items: 1
					},
					400:{
						items: 2
					},
					600:{
						items: 3
					},
					1000:{
						items: 3
					}
				}
			});
		}

		/* - Contact Map* */
		if($("#map-canvas-contact").length==1){
			initialize("map-canvas-contact");
		}
				
		/* - Counter Section */
		if($(".counter-section").length) {
			$(".counter-section").each(function ()
			{
				var $this = $(this);
				var myVal = $(this).data("value");

				$this.appear(function()
				{		
					var statistics_item_count = 0;
					var statistics_count = 0;
					statistics_item_count = $( "[id*='statistics_count-']" ).length;
					
					for(var i=1; i<=statistics_item_count; i++)
					{
						statistics_count = $( "[id*='statistics_count-"+i+"']" ).attr( "data-statistics_percent" );
						$("[id*='statistics_count-"+i+"']").animateNumber({ number: statistics_count }, 4000);
					}
				});
			});
		}
		
		/* - Gallery Section */
		gallery();
		if($(".gallery-list").length){
			var url;
			$(".gallery-list .gallery-box").magnificPopup({
				delegate: "a.zoom-in",
				type: "image",
				tLoading: "Loading image #%curr%...",
				mainClass: "mfp-img-mobile",
				gallery: {
					enabled: true,
					navigateByImgClick: false,
					preload: [0,1]
				},
				image: {
					tError: "<a href="%url%">The image #%curr%</a> could not be loaded.",
				}
			});
		}
		
		/* - Gallery Video Popup  */
		if($(".gallery-list .gallery-box").length ){
			$(".gallery-list .gallery-box a.popup-video").magnificPopup({
				disableOn: 700,
				type: "iframe",
				mainClass: "mfp-fade",
				removalDelay: 160,
				preloader: false,
				fixedContentPos: false
			});
		}
		
		/* - Blog Section Video Height */
		blog_video_height();
		
	});	/* Event - Document Ready */
	
	$( window ).on("resize",function() {
		
		var width	=	$(window).width();
		var height	=	$(window).height();
		
		/* - Blog Section Video Height */
		blog_video_height();
		
		/* - Gallery Video Height */
		gallery_video_height();
		
	});
	
	$(window).on("load",function() {
		
		/* - Gallery Section */
		gallery();
		
		/* - Blog Section Video Height */
		blog_video_height();
		
		/* - Gallery Video Height */
		gallery_video_height();
		
	});
	
})(jQuery);