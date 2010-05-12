
// Plugin: activityIndicator
(function($) {

	$.activity = function(options) {
		options = $.extend({}, {
			vWidth:150,
			vHeight:150,
			backgroundColor:'#000',
			borderRadius:10,
			opacity:0.8,
			iWidth:30,
			iHeight:30,
			style:Ti.UI.iPhone.ActivityIndicatorStyle.BIG,
			color:'#fff',
			text:'loading ...',
			fontSize:20,
			fontWeight:'bold'
		}, options);
		
		var indicatorWindow = $.window({
			width:options.vWidth,
			height:options.vHeight
		}),
			indicatorView = $.view({
				width:options.vWidth,
				height:options.vHeight,
				backgroundColor:options.backgroundColor,
				borderRadius:options.borderRadius,
				opacity:options.opacity
			}),
			actIndicator = $.activityIndicator({
				style:options.style,
				width:options.iWidth,
				height:options.iHeight
			}),
			msgLabel = $.label({
				text:options.text,
				color:options.color,
				width:'auto',
				height:'auto',
				font:{fontSize:options.fontSize,fontWeight:options.fontWeight},
				bottom:20
			});
			
		indicatorWindow.add(indicatorView);
		indicatorWindow.add(actIndicator);
		indicatorWindow.add(msgLabel);
		
		$(Ti.App).bind({
			show_indicator: function(e) {
				$.info('Show Activity Indicator');
				indicatorWindow.open();
				actIndicator.show();
			},
			hide_indicator: function(e) {
				$.info('Hide Activity Indicator');
				actIndicator.hide();
				indicatorWindow.close({opacity:0,duration:500});
			}
		});
		
		return this;
	};

})(this.alloy);

