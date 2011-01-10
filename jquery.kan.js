/* Keyboard Article Navigation jQuery Plugin */
//
// File:jquery.kan.js
// Version:0.1
// Andrew Terris
//
/* Andrew Terris */


(function( $ ){

	var settings;
	
	var methods = {
		init : function( options ) {

			//Default Settings
			var settings = {
				'anchor' : '.entry-title',
				'link' : '.entry-title a',
				'xoffset' : 0,
				'yoffset' : 0,			
				'next' : null,
				'prev' : null,
				'html' : '<span style="color: #4273DB;">&#9658;</span>'	
			};

			var focus = false;
			
			//Merge Defaults With User Supplied Options
			if ( options ) { 
				$.extend( settings, options );
			}
		
			//Work on Each Article Element Given
			this.each(function(n){
				$(this).addClass('kan-article');
			});

			//Setup Next and Previous Links	
			$(settings.next).addClass('kan-next');
			$(settings.previous).addClass('kan-previous');

			//Create Indicator Markup
			$('body').append('<div id="kan-indicator">' + settings.html + '</div>');
			
			
			//Find First Article Position
			settings.current = $('.kan-article:first');
			var position = settings.current.find(settings.anchor).position();

			//Position Indicator Absolutely
			$('#kan-indicator').css('position','absolute');

			//Setup Adjusted Offset		
			settings.xoffset = settings.xoffset - $('#kan-indicator').width();
			settings.yoffset = settings.yoffset + $('.kan-article:first '+settings.anchor).height()/2 - $('#kan-indicator').height()/2;
			
			//Set Indicator Position
			$('#kan-indicator').css('top',position.top + settings.yoffset + 'px');
			$('#kan-indicator').css('left',position.left +settings.xoffset + 'px');


			//Bind Keydown Event
			$(document).bind('keydown.kan', function(e) {
				if ( e.keyCode == 38 && settings.current.prevAll('.kan-article:first').length != 0 && !focus ) //If Up Arrow
				{				
					//Set New Active Article					
					settings.current = settings.current.prevAll('.kan-article:first');				
					
					//Set Active Class
					$('.kan-active').removeClass('kan-active');					
					settings.current.addClass('kan-active');
					
					//Set New Indicator Position					
					position = settings.current.find(settings.anchor).position();
					$('#kan-indicator').css('top',position.top + settings.yoffset + 'px');
					$('#kan-indicator').css('left',position.left +settings.xoffset + 'px');	
					
					return false;
				}
				else if ( e.keyCode == 40 && settings.current.nextAll('.kan-article:first').length != 0 && !focus ) //If Down Arrow
				{
					//Set New Active Article						
					settings.current = settings.current.nextAll('.kan-article:first');				

					//Set Active Class
					$('.kan-active').removeClass('kan-active');					
					settings.current.addClass('kan-active');

					//Set New Indicator Position					
					position = settings.current.find(settings.anchor).position();
					$('#kan-indicator').css('top',position.top + settings.yoffset + 'px');
					$('#kan-indicator').css('left',position.left +settings.xoffset + 'px');			
				
					return false;
				}
				else if ( e.keyCode == 13 && !focus ) //If Enter Key
				{
					var url = settings.current.find(settings.link).attr('href');
					window.location.href = url;

					return false;					
				}
			});

			//Check Focus
			$('input, textarea').bind('focus.kan', function(){ focus = true; $('.kan-active').removeClass('kan-active'); });
			$('input, textarea').bind('blur.kan', function(){ focus = false; $('.kan-active').removeClass('kan-active'); });
	
			return this;
		},
		
		add : function ( ) { 
			return this.each(function(){
				$(this).addClass('kan-article');			
			});
		},
		destroy : function( ) {

			return this.each(function(){

				//Unbind Events
				$(document).unbind('.kan');
				$('input, textarea').unbind('.kan');

			});
		}
	};

	$.fn.kan = function( method ) {
    
		if ( methods[method] ) {
			return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments );
		} else {
			$.error( 'Method ' +  method + ' does not exist on jQuery.kan' );
		}    
	};
})( jQuery );
