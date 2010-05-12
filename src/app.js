alloy.extend({
	prop: function(type, name, val, pre) {
		if (val && val !== undefined) {
			pre = "set"+alloy.ucFirst(type);
			return Ti.App.Properties[pre](name, val);
		} else {
			pre = "get"+alloy.ucFirst(type);
			return Ti.App.Properties[pre](name);
		}
	},
	listProps: function() {
		return Ti.App.Properties.listProperties();
	},
	isProp: function(name) {
		return Ti.App.Properties.hasProperty(name);
	},
	win: function() {
		return Ti.UI.currentWindow();
	},
	userAgent:Ti.userAgent,
	version:Ti.version,
	os: {
		name: Ti.Platform.osname,
		arch: Ti.Platform.ostype,
		version: Ti.Platform.version
	},
	clientWidth: Ti.Platform.displayCaps.platformWidth,
	clientHeight: Ti.Platform.displayCaps.platformHeight
});

alloy.each(["add", "remove"], function(i, name) {
	alloy.fn[name] = function() {
		var p = this.context;
		alloy.each(arguments, function(idx, arg) {
			p[name](arg);
		});
	};
	
});