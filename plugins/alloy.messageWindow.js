

(function($) {
	$.messageWindow = function(options) {
		Ti.API.info('Starting messageWindow');
		var defaults = {
			messageWindow: $.window({
				height:45,
				width:250,
				bottom:70,
				borderRadius:10,
				touchEnabled:false
			}),
			messageView: $.view({
				height:45,
				width:250,
				borderRadius:10,
				backgroundColor:'#000',
				opacity:0.7,
				touchEnabled:false
			}),
			messageLabel: $.label({
				text:'',
				color:'#fff',
				width:250,
				height:'auto',
				font:{fontFamily:'Helvetica Neue',fontSize:14},
				textAlign:'center'
			}),
			
			event: 'show_message',
			appBind: true,
			fadeDuration: 500,
			openDuration: 2000
		},
		settings = $.extend({}, defaults, options);
		
		settings.messageWindow.add(settings.messageView);
		settings.messageWindow.add(settings.messageLabel);
		
		$(Ti.App).bind('show_message', function(e) {
			settings.messageLabel.text = e.text;
			settings.messageWindow.open();
			setTimeout(function() {
				settings.messageWindow.close({opacity:0,duration:settings.fadeDuration});
			},settings.openDuration);
		});
		
		return this;
	};
})(this.alloy);

