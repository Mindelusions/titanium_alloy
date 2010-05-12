var apis = {};
alloy.each({
		api:"API",
		acc:"Accelerometer",
		analytics:"Analytics",
		app:"App",
		props:"App.Properties",
		contacts:"Contacts",
		db:"Database",
		fb:"Facebook",
		fs:"Filesystem",
		geo:"Geolocation",
		gesture:"Gesture",
		mapi:"Map",
		media:"Media",
		network:"Network",
		platform:"Platform",
		ui:"UI",
		android:"UI.Android",
		androidMenu:"UI.Android.OptionMenu",
		ipad:"UI.iPad",
		iphone:"UI.iPhone",
		utils:"Utils",
		xml:"XML",
		yahoo:"Yahoo"
}, function(name, api, base) {
	apis[name] = alloy.getObject(api, base);
	Ti.API.info('API: '+apis[name]);
});

alloy.extend(apis);

alloy.log = function(lvl, msg) {
	return Ti.API.log(lvl, msg);
};
alloy.each(["debug","error","info","warn"], function(idx, lvl) {
	alloy[lvl] = function(msg) {
		return alloy.log(lvl,msg);
	};
});

