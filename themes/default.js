(function($) {
	// view bg: #C5CCD3
	$.theme({
		label: {
			height:'auto',
			width:'auto',
			top:5,
			left:5,
			right:5,
			bottom:5,
			font:{fontSize:14,fontWeight:'normal'},
			color:'#666',
			shadowColor:'#fff',
			shadowOffset:{x:0,y:1}
		},
		button:{
			text:'_button_',
			font:{fontWeight:'bold',fontSize:17}
		},
		tableView: {
			backgroundColor:'transparent',
			rowBackgroundColor:'#fff',
			borderRadius:8,
			borderColor:'#d9d9d9',
			width:300,
			left:10,
			top:10,
			minRowHeight:44,
			style:$.iphone.TableViewStyle.GROUPED,
			font:{fontSize:17,fontFamily:'Helvetica'},
			color:'#4c566c'
		},
		"headerLabel": {
			width:300,
			height:'auto',
			color:'#D2242A',
			font:{
				fontSize:20,
				fontFamily:'Helvetica',
				fontWeight:'bold'
			},
			shadowColor:'#000',
			shadowOffset:{x:0,y:1},
			textAlign:'left'
		}
	});
	
})(this.alloy);